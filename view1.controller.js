sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
], (Controller,MessageToast,JSONModel,Fragment) => {
    "use strict";

    return Controller.extend("com.kt.sap.project4.controller.Firstview", {
        onInit() {
            var oModel = new JSONModel({
                InputData: [] ,
                count:0,
                formData:{
                sname: "",
                class: "",
                rollno: "",
                section: "",
                height:"",
                weight:"",
                result:""
                }
            });

          

            this.getView().setModel(oModel, "myModel");
             
            
            
        },
      
        // onSubmit:function(){
            
        //     // Getting the input field value

        //     var ostudentInput = this.byId("idStudenNname");
        //     var sValue = ostudentInput.getValue();
        //     var Class = this.byId("idClass");
        //     var sclass = Class.getValue();
        //     var Rollno = this.byId("idRoll_no");
        //     var Rollvalue = Rollno.getValue();
        //     var Section = this.byId("idSection");
        //     var Vsection = Section.getValue();
        //     var Height = this.byId("idHeight");
        //     var Vheight = Height.getValue();
        //     var Weight = this.byId("idWeight");
        //     var Vweight = Weight.getValue();
        //     var Result = this.byId("idResult");
        //     var Vresult = Result.getValue();
        //     if (!sValue || !sclass || !Rollvalue || !Vsection || !Vheight || !Vweight || !Vresult) {
        //         sap.m.MessageToast.show("Please enter value.");
        //         return;
        //     }

        //     var oModel = this.getView().getModel("myModel");
        //     var aData = oModel.getProperty("/InputData");

        //     // Add the new value to the array
        //     aData.push({ Studentname : sValue ,
        //                  Class :sclass,
        //                  Rollno :Rollvalue,
        //                  Section : Vsection,
        //                  Height : Vheight,
        //                  weight: Vweight,
        //                  result :Vresult
        //     });

            
        //     oModel.setProperty("/InputData", aData);
        //     oModel.setProperty("/count", aData.length);

        //     ostudentInput.setValue("");
        //     Class.setValue("");
        //     Rollno.setValue("");
        //     Section.setValue("");
        //     Height.setValue("");
        //     Weight.setValue("");
        //     Result.setValue("");
            
        //    MessageToast.show("Submit Succesfull");
        // },

        oncancelpress:function(){
            var ostudentInput = this.byId("idStudenNname");
            var sValue = ostudentInput.getValue();
            var Class = this.byId("idClass");
            var sclass = Class.getValue();
            var Rollno = this.byId("idRoll_no");
            var Rollvalue = Rollno.getValue();
            var Section = this.byId("idSection");
            var Vsection = Section.getValue();
            var Height = this.byId("idHeight");
            var Vheight = Height.getValue();
            var Weight = this.byId("idWeight");
            var Vweight = Weight.getValue();
            var Result = this.byId("idResult");
            var Vresult = Result.getValue();


            ostudentInput.setValue("");
            Class.setValue("");
            Rollno.setValue("");
            Section.setValue("");
            Height.setValue("");
            Weight.setValue("");
            Result.setValue("");
        },
        onAddbtnpress:function(){

          // Reset formData model for adding new entry
          var oFormData = this.getView().getModel("myModel").getProperty("/formData");
          oFormData.sname = "";
          oFormData.class = "";
          oFormData.rollno = "";
          oFormData.section = "";
          oFormData.height = "";
          oFormData.weight = "";
          oFormData.result = "";
          

          this._openFragment();
        },

        onSubmitbtnpress:function(){
            
            var ostudentInput = this.byId("idStudenNname1");
            var sValue = ostudentInput.getValue();
            var Class = this.byId("idClass1");
            var sclass = Class.getValue();
            var Rollno = this.byId("idRoll_no1");
            var Rollvalue = Rollno.getValue();
            var Section = this.byId("idSection1");
            var Vsection = Section.getValue();
            var Height = this.byId("idHeight1");
            var Vheight = Height.getValue();
            var Weight = this.byId("idWeight1");
            var Vweight = Weight.getValue();
            var Result = this.byId("idResult1");
            var Vresult = Result.getValue();
            if (!sValue || !sclass || !Rollvalue || !Vsection || !Vheight || !Vweight || !Vresult) {
                sap.m.MessageToast.show("Please enter value.");
                return;
            }

            var oModel = this.getView().getModel("myModel");
            var aData = oModel.getProperty("/InputData");

            // Add the new value to the array
            aData.push({ Studentname : sValue ,
                         Class :sclass,
                         Rollno :Rollvalue,
                         Section : Vsection,
                         Height : Vheight,
                         weight: Vweight,
                         result :Vresult
            });

            
            oModel.setProperty("/InputData", aData);
            oModel.setProperty("/count", aData.length);

            ostudentInput.setValue("");
            Class.setValue("");
            Rollno.setValue("");
            Section.setValue("");
            Height.setValue("");
            Weight.setValue("");
            Result.setValue("");
            
           MessageToast.show("Submit Succesfull");

        },
        onDeletePress:function(){
            var Table = this.byId("idmytable");

            var oSelectedItem = Table.getSelectedItem();
            
            
            if (!oSelectedItem) {
                MessageToast.show("Please select a row to delete!");
                return;
            }

            // Get the selected row's binding context 
            var sPath = oSelectedItem.getBindingContext("myModel").getPath();
            var iIndex = parseInt(sPath.split("/").pop(), 10);
               
            // Get the model  current data
            var oModel = this.getView().getModel("myModel");
            var aData = oModel.getProperty("/InputData");

            // Remove the selected row from the data array
            aData.splice(iIndex, 1);

            // Update the model
            oModel.setProperty("/InputData", aData);

            oModel.setProperty("/count", aData.length);

            Table.removeSelections();
            MessageToast.show("Row deleted successfully!");

        },

        onEditpress:function(){

            var oTable = this.byId("idMyTable");
            var oSelectedItem = oTable.getSelectedItem();

            if (!oSelectedItem) {
                MessageToast.show("Please select a row to edit!");
                return;
            }

            // Get selected row data
            var oRowData = oSelectedItem.getBindingContext("myModel").getObject();

            // Populate formData model
            var oFormData = this.getView().getModel("myModel").getProperty("/formData");
            oFormData.sname = oRowData.sname;
            oFormData.class = oRowData.class;
            oFormData.rollno = oRowData.rollno;
            oFormData.section = oRowData.section;
            oFormData.height = oRowData.height;
            oFormData.weight = oRowData.weight;
            oFormData.result = oRowData.result;
            
            this._openFragment();
        },
        _openFragment: function () {
            if (!this.oDialog) {
                Fragment.load({
                  id: this.getView().getId(),
                  name: "com.kt.sap.project4.fragment.test",
                  controller: this
                }).then(function (oDialog) {
                  this.oDialog = oDialog;
                  this.getView().addDependent(this.oDialog);
                  this.oDialog.open();
                }.bind(this));
              } else {
                this.oDialog.open();
              }
        }


      
       
   
       

    });
});
