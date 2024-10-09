using Microsoft.EntityFrameworkCore;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MyProject.Repository.Repositories
{
    public class CategoryRepository:ICategory
    {
        private readonly IContext _context;
        public CategoryRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Category> AddItemAsync(Category item)
        {
            await _context.Categories.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Categories.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<Category> getAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Category>> getAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task UpdateItem(int id,Category item)
        {
            var optionItem = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            optionItem.ParentCategoryId = item.ParentCategoryId;
            _context.Categories.Update(optionItem);
            await _context.save();
        }
        public List<Category> ConvertTreeNodeToList(Tree<Category>.TreeNode node)
        {
            var list = new List<Category>();
            ConvertTreeNodeToListHelper(node, list);
            return list;
        }

        private void ConvertTreeNodeToListHelper(Tree<Category>.TreeNode node, List<Category> list)
        {
            list.Add(node.Data);
            foreach (var child in node.Children)
            {
                ConvertTreeNodeToListHelper(child, list);
            }
        }
        public async Task<Tree<Category>.TreeNode> GetCategoriesTree()
        {
            var categories = await getAllAsync();

            var tree = new Tree<Category>(
                categories,
                category => category.Id,             // getIdFunc: Extracts the Id of a Category
                category => category.ParentCategoryId // getParentIdFunc: Extracts the ParentCategoryId of a Category
            );

            var root = await tree.BuildAsync();
            return root;
        }
        public async Task<List<Category>> GetSubtreeList(Category category)
        {
            var categories = await getAllAsync();
            var tree = new Tree<Category>(
                categories,
                c => c.Id,                     // getIdFunc: Extracts the Id of a Category
                c => c.ParentCategoryId        // getParentIdFunc: Extracts the ParentCategoryId of a Category
            );

            var root = FindRootNode(tree, category);
            if (root != null)
            {
                return ConvertTreeNodeToList(root);
            }
            else
            {
                // Return an empty list if the category is not found
                return new List<Category>();
            }
        }
        private Tree<Category>.TreeNode FindRootNode(Tree<Category> tree, Category category)
        {
            var root = tree.BuildAsync().Result;
            return FindNode(root, category);
        }

        

        public async Task<Tree<Category>.TreeNode> GetSubtreeAsync(Category category)
        {
            var categories = await getAllAsync();

            var tree = new Tree<Category>(
                categories,
                c => c.Id,                     // getIdFunc: Extracts the Id of a Category
                c => c.ParentCategoryId        // getParentIdFunc: Extracts the ParentCategoryId of a Category
            );

            return await FindRootNodeAsync(tree, category);
        }

        private async Task<Tree<Category>.TreeNode> FindRootNodeAsync(Tree<Category> tree, Category category)
        {
            var root = await tree.BuildAsync();
            return FindNode(root, category);
        }
       
        private Tree<Category>.TreeNode FindNode(Tree<Category>.TreeNode node, Category category)
        {
            if (node.Data == category)
            {
                return node;
            }

            foreach (var child in node.Children)
            {
                var foundNode = FindNode(child, category);
                if (foundNode != null)
                {
                    return foundNode;
                }
            }

            return null;
        }

    }
}
