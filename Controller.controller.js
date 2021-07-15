sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.TreeTable.JSONTreeBinding.Controller", {
		onInit: function() {
			var oModel = new JSONModel("Clothing.json");
			this.getView().setModel(oModel);
		},

		onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onCollapseSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapse(oTreeTable.getSelectedIndices());
		},

		onExpandFirstLevel: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},

		onExpandSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		},

		onTreeTableBindingChange: function (oEvent) {
			var oBinding = oEvent.getSource();
			var aSavedExpanded = JSON.parse(localStorage.getItem("expandedItems") || "[]");
			var bCollapseOrExpand = oEvent.getParameter("reason") === "collapse" || oEvent.getParameter("reason") === "expand";

			if (!bCollapseOrExpand && !oBinding.bSkip && oBinding.getLength && oBinding.getLength()) {
				for (var index = 0; index < aSavedExpanded.length; index++) {
					var sExpandedGroup = aSavedExpanded[index];

					oBinding._updateTreeState({
						groupID: sExpandedGroup,
						expanded: true
					});
				}

				oBinding.bSkip = true;
				oBinding.refresh();
				setTimeout(function () {
					delete oBinding.bSkip;
				});
			}
			if (bCollapseOrExpand) {
				setTimeout(function () {
					localStorage.setItem("expandedItems", JSON.stringify(oBinding.getCurrentTreeState()._getExpandedList().split(";")));
				});
			}
		},

		onExpandFirstTwoLevels: function () {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(2);
		}
	});
});