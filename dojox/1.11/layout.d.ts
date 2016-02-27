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

		/* dojox/layout/GridContainer */

		interface GridContainer extends GridContainerLite {
			/**
			 * Allow or not resizing of columns by a grip handle.
			 */
			hasResizableColumns: boolean;

			/**
			 * Specifies whether columns resize as you drag (true) or only upon mouseup (false).
			 */
			liveResizeColumns: boolean;

			/**
			 * Minimum column width in percentage.
			 */
			minColWidth: number;

			/**
			 * Minimum children width in pixel (only used for IE6 which doesn't
			 * handle min-width css property).
			 */
			minChildWidth: number;

			/**
			 * Location to add/remove columns, must be set to 'left' or 'right' (default).
			 */
			mode: string;
			// mode: 'left' | 'right';

			/**
			 * Define if the last right column is fixed.
			 * Used when you add or remove columns by calling setColumns method.
			 */
			isRightFixed: boolean;

			/**
			 * Define if the last left column is fixed.
			 * Used when you add or remove columns by calling setColumns method.
			 */
			isLeftFixed: boolean;

			/**
			 * Set the number of columns.
			 */
			setColumns(nbColumns: number): void;
		}

		interface GridContainerConstructor extends dijit._WidgetBaseConstructor<GridContainer> { }

		/* dojox/layout/TableContainer */

		interface TableContainer extends dijit.layout._LayoutWidget {

			cols: number;

			/**
			 * Defines the width of a label. If the value is a number, it is
			 * treated as a pixel value. The other valid value is a percentage,
			 * e.g. "50%".
			 */
			labelWidth: string | number;

			/**
			 * True if labels should be displayed, false otherwise.
			 */
			showLabels: boolean;

			/**
			 * Either "horiz" or "vert" for label orientation.
			 */
			orientation: string;
			// orientation: 'horiz' | 'vert';

			/**
			 * The cell spacing to apply to the table.
			 */
			spacing: number;

			/**
			 * A CSS class that will be applied to child elements. For example, if
			 * the class is "myClass", the table will have "myClass-table" applied to it,
			 * each label TD will have "myClass-labelCell" applied, and each
			 * widget TD will have "myClass-valueCell" applied.
			 */
			customClass: string;
		}

		interface TableContainerConstructor extends dijit._WidgetBaseConstructor<TableContainer> { }
	}
}
