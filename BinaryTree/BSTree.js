const Stack = require("../Stack/ArrayStack");
const Queue = require("../Queue/ArrayQueue");
const TreeNode = require("./TreeNode");


class BSTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        let newNode = new TreeNode(val);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    /**
     * 插入节点，按照排序二叉树规则插入
     * @param node 插入位置节点
     * @param newNode 待插入节点
     */
    insertNode(node, newNode) {
        if (newNode.val < node.val) {
            if (node.left == null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right == null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    /**
     * 中序排序
     * @param callback 输入回调
     */
    inOrder(callback) {
        if (this.root == null) return;
        this.inOrderNode(this.root, callback)
    }

    inOrderNode(node, callback) {
        if (node == null) return;
        this.inOrderNode(node.left, callback)
        callback(node.val);
        this.inOrderNode(node.right, callback)
    }

    preOrder(callback) {
        if (this.root == null) return;
        this.preOrderNode(this.root, callback)
    }

    preOrderNode(node) {
        if (node == null) return;
        callback(node.val);
        this.preOrderNode(node.left, callback)
        this.preOrderNode(node.right, callback)
    }


    preOrderWithStack(callback) {
        let node = this.root;
        let stack = new Stack();
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                callback(node.val);
                stack.push(node);
                node = node.left;
            }
            if (!stack.isEmpty()) {
                let popNode = stack.pop();
                node = popNode?.right ?? null;
            }
        }
    }

    inOrderWithStack(callback) {
        let node = this.root;
        let stack = new Stack();
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            if (!stack.isEmpty()) {
                let popNode = stack.pop();
                callback(popNode?.val);
                node = popNode?.right ?? null;
            }
        }
    }

    postOrderWithStack(callback) {
        let node = this.root;
        let stack = new Stack();
        let prev = null;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            let popNode = stack.pop() ?? null;
            if (popNode?.right == null || popNode.right == prev) {
                callback(popNode?.val);
                prev = popNode;
            } else {
                stack.push(popNode);
                node = popNode?.right ?? null;
            }
        }
    }

    postOrder(callback) {
        if (this.root == null) return;
        this.postOrderNode(this.root, callback);
    }

    postOrderNode(node, callback) {
        if (node == null) return null;
        this.postOrderNode(node.left, callback)
        this.postOrderNode(node.right, callback);
        callback(node.val)

    }

    findMin() {
        return this.findNodeMin(this.root);
    }

    findNodeMin(node) {
        if (node) {
            while (node && node.left) {
                node = node.left;
            }
            return node;
        }
        return null;
    }

    findMax() {
        return this.findNodeMax(this.root);
    }

    findNodeMax(node) {
        if (node) {
            while (node && node.right) {
                node = node.right;
            }
            return node
        }
        return null
    }

    search(val) {
        return this.searchNode(this.root, val);
    }

    searchNode(node, val) {
        if (node == null) return null;
        if (node.val === val) {
            return node;
        } else if (val < node.val) {
            return this.searchNode(node.left, val)
        } else {
            return this.searchNode(node.right, val)
        }
    }

    remove(val) {
        return this.removeNode(this.root, val);
    }

    removeNode(node, val) {
        if (node == null)
            return null;
        // if (node.val == val)
        //     return node;
        if (val < node.val) {
            node.left = this.removeNode(node.left, val);
            return node;
        }
        else if (val > node.val) {
            node.right = this.removeNode(node.right, val);
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            } else {
                //左右子节点均存在时
                //找到右子节点最小值，赋给被删除节点，保证平衡
                let minRightNode = this.findNodeMin(node.right);
                if (minRightNode) {
                    node.val = minRightNode.val;
                    node.right = this.removeNode(node.right, minRightNode.val);
                }
                return minRightNode;
            }

        }
    }

    levelOrderTraversal(callback) {
        if (this.root == null) return;
        let queue = new Queue()
        queue.enQueue(this.root);
        while (!queue.isEmpty()) {
            let node = queue.deQueue();
            callback(node.val);
            if (node.left != null) {
                queue.enQueue(node.left)
            }
            if (node.right != null) {
                queue.enQueue(node.right)
            }
        }
    }

}
//创建一个二叉树实例
let bst = new BSTree();
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
//构建二叉树
nodes.forEach(x => bst.insert(x));
//遍历回调：打印元素
let cb = (v) => {
    console.log(v)
}
//前中后
// bst.postOrderWithStack(cb);
// bst.inOrder(cb);
// bst.postOrder(cb);
// //前中后（栈回溯）
// bst.preOrderWithStack(cb);
// bst.inOrderWithStack(cb);
// bst.postOrderWithStack(cb);
//广度优先遍历（层序遍历）（队列FIFO实现）
// bst.levelOrderTraversal(cb);
//查找最大、最小、具体值
// console.log('findMin: ', bst.findMin());
// console.log('findMax: ', bst.findMax());
// console.log('bst.has(27): ', bst.search(27));

bst.remove(3)