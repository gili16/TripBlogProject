using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MyProject.Repository.Entities;


public class Tree<T>
{
    public class TreeNode
    {
        public T Data { get; set; }
        public List<TreeNode> Children { get; set; }

        public TreeNode()
        {
            Children = new List<TreeNode>();
        }
    }

    private List<T> _items;
    private Func<T, object> _getIdFunc;
    private Func<T, object> _getParentIdFunc;

    public Tree(List<T> items, Func<T, object> getIdFunc, Func<T, object> getParentIdFunc)
    {
        _items = items;
        _getIdFunc = getIdFunc;
        _getParentIdFunc = getParentIdFunc;
    }

    public async Task<TreeNode> BuildAsync()
    {
        var roots = _items.Where(item => _getParentIdFunc(item) == null).ToList();
        var rootNodes = new List<TreeNode>();
        foreach (var root in roots)
        {
            var rootNode = await BuildSubtreeAsync(root);
            rootNodes.Add(rootNode);
        }
        if (rootNodes.Count > 1)
        {
            var dummyRoot = new TreeNode();
            dummyRoot.Children.AddRange(rootNodes);
            return dummyRoot;
        }
        else
        {
            return rootNodes.FirstOrDefault();
        }
    }

    private async Task<TreeNode> BuildSubtreeAsync(T item)
    {
        var node = new TreeNode { Data = item };
        var children = _items.Where(child => _getParentIdFunc(child)?.Equals(_getIdFunc(item)) == true).ToList();
        foreach (var child in children)
        {
            var childNode = await BuildSubtreeAsync(child);
            node.Children.Add(childNode);
        }
        return node;
    }
}
 
