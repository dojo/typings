declare namespace dojox {
	namespace layout {

		/* dojox/layout/ContentPane */

		interface ContentPane extends dijit.layout.ContentPane {
			/**
			 * Adjust relative paths in html string content to point to this page.
			 * Only useful if you grab content from another folder than the current one.
			 */
			adjustPaths: boolean;

			/**
			 * Cleans content to make it less likely to generate DOM/JS errors.
			 * Useful if you send ContentPane a complete page, instead of a html fragment.
			 * Scans for:
			 *
			 * - title Node, remove
			 * - DOCTYPE tag, remove
			 */
			cleanContent: boolean;

			/**
			 * trigger/load styles in the content
			 */
			renderStyles: boolean;

			/**
			 * Execute (eval) scripts that are found in the content.
			 */
			executeScripts: boolean;

			/***
			 * Replace keyword '_container_' in scripts with 'dijit.byId(this.id)'.
			 * NOTE this name might change in the near future.
			 */
			scriptHasHooks: boolean;

			/**
			 * Event callback, called on script error or on java handler error.
			 * Qverride and return your own html string if you want text
			 * displayed within the ContentPane.
			 */
			onExecError(evt: Event): void;
		}

		interface ContentPaneConstructor extends dijit._WidgetBaseConstructor<ContentPane> { }

		/* dojox/layout/GridContainerLite */

		interface GridContainerLite extends dijit.layout._LayoutWidget, dijit._TemplatedMixin {
			/**
			 * Enable the refresh of registered areas on drag start.
			 */
			autoRefresh: boolean;

			/**
			 * CSS class enabling a drag handle on a child.
			 */
			dragHandleClass: string;

			/**
			 * The number of dropped zones, by default 1.
			 */
			nbZones: number;

			/**
			 * If true, change the size of my currently displayed child to match
			 * my size.
			 */
			doLayout: boolean;

			/**
			 * If true, widgets are organized automatically,
			 * else the attribute 'column' of child will define the right column.
			 */
			isAutoOrganized: boolean;

			/**
			 * The GridContainer will only accept the children that fit to the types.
			 */
			acceptTypes: any[];

			/**
			 * A comma separated list of column widths. If the column widths do
			 * not add up to 100, the remaining columns split the rest of the
			 * width evenly between them.
			 */
			colWidths: string;

			/**
			 * Resize the GridContainerLite inner table and the dropped widget.
			 */
			resizeChildAfterDrop(node: HTMLElement, targetArea: Object, indexChild: number): boolean;

			/**
			 * Resize the GridContainerLite inner table only if the drag source
			 * is a child of this gridContainer.
			 */
			resizeChildAfterDragStart(node: HTMLElement, sourceArea: Object, indexChild: number): boolean;

			onShow(): void;
			onHide(): void;

			/**
			 * Enable drag-and-drop for children of this GridContainer.
			 */
			enableDnd(): void;

			/**
			 * Disable drag-and-drop for children of this GridContainer.
			 */
			disableDnd(): void;
		}

		interface GridContainerLiteConstructor extends dijit._WidgetBaseConstructor<GridContainerLite> { }
	}
}
