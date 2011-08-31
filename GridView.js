/*
Date:03-18-2009
Aurthor:Prabin Shrestha
email:shprabin@gmail.com

*/

//created a Framework Object
var JUI={};
JUI.Component = function(){};

/*--------------------------------------------------------------------*/
/*-----------------------------Gridview-------------------------------*/
JUI.Component.GridView= function(containerId){
							this.containerId = containerId;
							this.header = new JUI.Component.GridView.Helper.HeaderRow();
							this.data = new JUI.Component.GridView.Helper.Rows(this);
							this.index= this.instances.length;
							this.instances[this.index]=this;
							return this;
							
};

JUI.Component.GridView.prototype = {
	instances : [],
	
	setStyle : function(client,styleClass){
					client.className = styleClass;
	},
	
	render :  function(){
		if(this.header.row[0].sortSymbol==undefined)
			this.header.initializeSortSymbol();
		var text="<table id=\"jui_gridview\" class=\"jui_gridview\"  cellspacing=\"0\" cellpadding=\"2px\" >";
		text+="<tr class=\"header\">";
		for(k=0;k<this.header.row.length;k++){
			text+="<td width=\""+ this.header.row[k].Width + "\"";
			text+=" onClick=\"JUI.Component.GridView.prototype.instances["+this.index+"].data.sortRows('"+this.header.row[k].Name+"')\"" + " >";
			text+=this.header.row[k].Label;
			text+=" <span class=\"updownsign\">"+ this.header.row[k].sortSymbol +"</span></td>";
		}	
		text+="</tr>";	
		for(i=0; i<this.data.rows.length; i++){
			var fetchRow= this.data.rows[i];
			text+="<tr onMouseOver=\"JUI.Component.GridView.prototype.setStyle(this,'mouseover')\" onMouseOut=\"JUI.Component.GridView.prototype.setStyle(this,'')\">";
			for(j=0; j<this.header.row.length; j++){
				if(fetchRow[this.header.row[j].Name]==undefined || fetchRow[this.header.row[j].Name]==null ){
					text+="<td>&nbsp;</td>";
				}
				else{
					text+="<td>"+fetchRow[this.header.row[j].Name]+"</td>";
				}
			}
			text+="</tr>";		
		}
		text+="</table>";
		document.getElementById(this.containerId).innerHTML = text;
	}
};	

JUI.Component.GridView.Helper={};

JUI.Component.GridView.Helper.Rows=function(parent){
	this.rows =[];
	this.parent=parent;
	return this;
};

JUI.Component.GridView.Helper.Rows.prototype = {
		addRow : function(rowobj){
					this.rows.push(rowobj);			
		},
		
		deleteRow : function(){
						this.rows.pop();
		},
		
		sortRows : function(colName){
					var changedCol = this.parent.header.changeSortSymbol(colName);
					function sortfunction(a,b){ 
									
										if(changedCol.sortSymbol=="&#61493;")
										{//ascending
											if (a[colName] === b[colName]) {
												return 0;
											}
											if (typeof a[colName] === typeof b[colName]) {
												return a[colName]  < b[colName]  ? -1 : 1;
											}
											return typeof a[colName] < typeof b[colName]  ? -1 : 1;
										}
										else if(changedCol.sortSymbol=="&#61494;")
										{//descending
											if (a[colName] === b[colName]) {
												return 0;
											}
											if (typeof a[colName] === typeof b[colName]) {
												return a[colName]  > b[colName]  ? -1 : 1;
											}
											return typeof a[colName] > typeof b[colName]  ? -1 : 1;
										
										}
									
								}	
					this.rows.sort(sortfunction);
					//here this variable is gridview.data so to call render I used this.parent.render
					this.parent.render();
		
		}
		
};
	
JUI.Component.GridView.Helper.HeaderRow= function(){
	this.row=[];
	return this;
};

JUI.Component.GridView.Helper.HeaderRow.prototype={
		addColumn : function(headerColumn){
						this.row.push(headerColumn);
						},
						
		deleteColumn : function(){
						this.row.pop();
						},
		initializeSortSymbol :function(){
								for(i=0;i<this.row.length;i++){
									this.row[i].sortSymbol="";
								}
		},
		
		changeSortSymbol: function(colName){
							var obj,temp;
							for(i=0;i<this.row.length;i++){
								obj = this.row[i];
								if(colName==obj.Name){
									if(obj.sortSymbol=="")
										obj.sortSymbol="&#61493;";//asc
									else if(obj.sortSymbol=="&#61493;")
										obj.sortSymbol="&#61494;";//desc
									else
										obj.sortSymbol="&#61493;";
								
									temp=obj;						
								}
								else{
									obj.sortSymbol="";
								}
								
							
							}
							return temp;
		}
	};	



								

						




