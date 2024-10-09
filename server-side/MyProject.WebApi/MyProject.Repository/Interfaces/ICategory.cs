using MyProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Interfaces
{
    public interface ICategory:IRepository<Category>
    {
        List<Category> ConvertTreeNodeToList(Tree<Category>.TreeNode node);
        Task<Tree<Category>.TreeNode> GetCategoriesTree();
        Task<Tree<Category>.TreeNode> GetSubtreeAsync(Category category);
        Task<List<Category>> GetSubtreeList(Category category);
    }
}
