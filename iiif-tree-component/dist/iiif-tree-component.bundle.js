// base-component v1.1.2 https://github.com/iiif-commons/base-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.baseComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var _Components;
(function (_Components) {
    var BaseComponent = /** @class */ (function () {
        function BaseComponent(options) {
            this.options = options;
            this.options.data = $.extend(this.data(), options.data);
        }
        BaseComponent.prototype._init = function () {
            this._$element = $(this.options.target);
            if (!this._$element.length) {
                console.warn('element not found');
                return false;
            }
            this._$element.empty();
            return true;
        };
        BaseComponent.prototype.data = function () {
            return {};
        };
        BaseComponent.prototype.on = function (name, callback, ctx) {
            var e = this._e || (this._e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });
        };
        BaseComponent.prototype.fire = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }
        };
        BaseComponent.prototype._resize = function () {
        };
        BaseComponent.prototype.set = function (data) {
        };
        return BaseComponent;
    }());
    _Components.BaseComponent = BaseComponent;
})(_Components || (_Components = {}));
(function (g) {
    if (!g._Components) {
        g._Components = _Components;
    }
})(global);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.iiifTreeComponent=f()}}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){(function(global){var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(IIIFComponents){var TreeComponent=function(_super){function TreeComponent(options){var _this=_super.call(this,options)||this;return _this._init(),_this}return __extends(TreeComponent,_super),TreeComponent.prototype._init=function(){var success=_super.prototype._init.call(this);success||console.error("TreeComponent failed to initialise");var that=this;return this._$tree=$('<ul class="tree"></ul>'),this._$element.append(this._$tree),$.templates({pageTemplate:"{^{for nodes}}                                    {^{tree/}}                                {{/for}}",treeTemplate:'<li>                                    {^{if nodes && nodes.length}}                                        <div class="toggle" data-link="class{merge:expanded toggle=\'expanded\'}"></div>                                    {{else}}                                    <div class="spacer"></div>                                    {{/if}}                                    {^{if multiSelectEnabled}}                                        <input id="tree-checkbox-{{>id}}" type="checkbox" data-link="checked{:multiSelected ? \'checked\' : \'\'}" class="multiSelect" />                                    {{/if}}                                    {^{if selected}}                                        <a id="tree-link-{{>id}}" href="#" title="{{>label}}" class="selected">{{>label}}</a>                                    {{else}}                                        <a id="tree-link-{{>id}}" href="#" title="{{>label}}">{{>label}}</a>                                    {{/if}}                                </li>                                {^{if expanded}}                                    <li>                                        <ul>                                            {^{for nodes}}                                                {^{tree/}}                                            {{/for}}                                        </ul>                                    </li>                                {{/if}}'}),$.views.tags({tree:{toggleExpanded:function(){var node=this.data;that._setNodeExpanded(node,!node.expanded)},toggleMultiSelect:function(){var node=this.data;that._setNodeMultiSelected(node,!node.multiSelected),node.isRange()&&that._getMultiSelectState().selectRange(node.data,node.multiSelected),that.fire(TreeComponent.Events.TREE_NODE_MULTISELECTED,node)},init:function(tagCtx,linkCtx,ctx){this.data=tagCtx.view.data},onAfterLink:function(){var self=this;self.contents("li").first().on("click",".toggle",function(){self.toggleExpanded()}).on("click","a",function(e){e.preventDefault();var node=self.data;node.nodes.length&&self.toggleExpanded(),node.multiSelectEnabled?self.toggleMultiSelect():node.nodes.length?that.options.data.branchNodesSelectable&&(that.fire(TreeComponent.Events.TREE_NODE_SELECTED,node),that.selectNode(node)):(that.fire(TreeComponent.Events.TREE_NODE_SELECTED,node),that.selectNode(node))}).on("click","input.multiSelect",function(e){self.toggleMultiSelect()})},template:$.templates.treeTemplate}}),success},TreeComponent.prototype.set=function(data){var _this=this;this.options.data=data,this._rootNode=this.options.data.helper.getTree(this.options.data.topRangeIndex,this.options.data.treeSortType),this._allNodes=null,this._multiSelectableNodes=null,this._$tree.link($.templates.pageTemplate,this._rootNode);for(var multiSelectState=this._getMultiSelectState(),_loop_1=function(i){var range=multiSelectState.ranges[i],node=this_1._getMultiSelectableNodes().en().where(function(n){return n.data.id===range.id}).first();node&&(this_1._setNodeMultiSelectEnabled(node,range.multiSelectEnabled),this_1._setNodeMultiSelected(node,range.multiSelected))},this_1=this,i=0;i<multiSelectState.ranges.length;i++)_loop_1(i);if(this.options.data.autoExpand){var allNodes=this._getAllNodes();allNodes.forEach(function(node,index){node.nodes.length&&_this._setNodeExpanded(node,!0)})}},TreeComponent.prototype._getMultiSelectState=function(){return this.options.data.helper.getMultiSelectState()},TreeComponent.prototype.data=function(){return{autoExpand:!1,branchNodesSelectable:!0,helper:null,topRangeIndex:0,treeSortType:Manifold.TreeSortType.NONE}},TreeComponent.prototype.allNodesSelected=function(){var applicableNodes=this._getMultiSelectableNodes(),multiSelectedNodes=this.getMultiSelectedNodes();return applicableNodes.length===multiSelectedNodes.length},TreeComponent.prototype._getMultiSelectableNodes=function(){var _this=this;return this._multiSelectableNodes?this._multiSelectableNodes:this._multiSelectableNodes=this._getAllNodes().en().where(function(n){return _this._nodeIsMultiSelectable(n)}).toArray()},TreeComponent.prototype._nodeIsMultiSelectable=function(node){return node.isManifest()&&node.nodes.length>0||node.isRange()},TreeComponent.prototype._getAllNodes=function(){return this._allNodes?this._allNodes:this._allNodes=this._rootNode.nodes.en().traverseUnique(function(node){return node.nodes}).toArray()},TreeComponent.prototype.getMultiSelectedNodes=function(){var _this=this;return this._getAllNodes().en().where(function(n){return _this._nodeIsMultiSelectable(n)&&n.multiSelected}).toArray()},TreeComponent.prototype.getNodeById=function(id){return this._getAllNodes().en().where(function(n){return n.id===id}).first()},TreeComponent.prototype._multiSelectTreeNode=function(node,isSelected){if(this._nodeIsMultiSelectable(node)){this._setNodeMultiSelected(node,isSelected);for(var i=0;i<node.nodes.length;i++){var n=node.nodes[i];this._multiSelectTreeNode(n,isSelected)}}},TreeComponent.prototype._expandParents=function(node){node.parentNode&&(this._setNodeExpanded(node.parentNode,!0),this._expandParents(node.parentNode))},TreeComponent.prototype._setNodeSelected=function(node,selected){$.observable(node).setProperty("selected",selected)},TreeComponent.prototype._setNodeExpanded=function(node,expanded){$.observable(node).setProperty("expanded",expanded)},TreeComponent.prototype._setNodeMultiSelected=function(node,selected){$.observable(node).setProperty("multiSelected",selected)},TreeComponent.prototype._setNodeMultiSelectEnabled=function(node,enabled){$.observable(node).setProperty("multiSelectEnabled",enabled)},TreeComponent.prototype.selectPath=function(path){if(this._rootNode){var pathArr=path.split("/");pathArr.length>=1&&pathArr.shift();var node=this.getNodeByPath(this._rootNode,pathArr);this.selectNode(node)}},TreeComponent.prototype.deselectCurrentNode=function(){this._selectedNode&&this._setNodeSelected(this._selectedNode,!1)},TreeComponent.prototype.selectNode=function(node){this._rootNode&&(this.deselectCurrentNode(),this._selectedNode=node,this._setNodeSelected(this._selectedNode,!0))},TreeComponent.prototype.getNodeByPath=function(parentNode,path){if(0===path.length)return parentNode;var index=Number(path.shift()),node=parentNode.nodes[index];return this.getNodeByPath(node,path)},TreeComponent.prototype.show=function(){this._$element.show()},TreeComponent.prototype.hide=function(){this._$element.hide()},TreeComponent.prototype._resize=function(){},TreeComponent}(_Components.BaseComponent);IIIFComponents.TreeComponent=TreeComponent}(IIIFComponents||(IIIFComponents={})),function(IIIFComponents){var TreeComponent;!function(TreeComponent){var Events=function(){function Events(){}return Events.TREE_NODE_MULTISELECTED="treeNodeMultiSelected",Events.TREE_NODE_SELECTED="treeNodeSelected",Events}();TreeComponent.Events=Events}(TreeComponent=IIIFComponents.TreeComponent||(IIIFComponents.TreeComponent={}))}(IIIFComponents||(IIIFComponents={})),function(g){g.IIIFComponents?g.IIIFComponents.TreeComponent=IIIFComponents.TreeComponent:g.IIIFComponents=IIIFComponents}(global)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});