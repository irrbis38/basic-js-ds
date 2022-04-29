const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootEl = null;
  }

  root() {
    return this.rootEl;
  }

  add(data) {
    function insertNode(currentNode, newNode) {
      if (newNode.data < currentNode.data) {
        !currentNode.left
          ? (currentNode.left = newNode)
          : insertNode(currentNode.left, newNode);
      } else {
        !currentNode.right
          ? (currentNode.right = newNode)
          : insertNode(currentNode.right, newNode);
      }
    }
    const newNode = new Node(data);
    !this.rootEl ? (this.rootEl = newNode) : insertNode(this.rootEl, newNode);
  }

  has(data) {
    function search(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      return data < node.data
        ? search(node.left, data)
        : search(node.right, data);
    }
    return search(this.rootEl, data);
  }

  find(data) {
    function search(node, data) {
      if (!node) return null;
      if (data < node.data) return search(node.left, data);
      if (data > node.data) return search(node.right, data);
      return node;
    }
    return search(this.rootEl, data);
  }

  remove(data) {
    function del(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = del(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = del(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        let item = node.right;
        while (item.left) {
          item = item.left;
        }
        node.data = item.data;
        node.right = del(node.right, item.data);
        return node;
      }
    }
    this.rootEl = del(this.rootEl, data);
  }

  min() {
    if (!this.rootEl) return null;
    let node = this.rootEl;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootEl) return null;
    let node = this.rootEl;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
