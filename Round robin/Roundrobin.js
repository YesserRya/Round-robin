
function Process(name,ta,tx){
    this.name = name;
    this.arrivingInstant = ta;
    this.executionTime = tx;
    this.tourniquet = 0;
    this.leftToArrive = ta;
    this.End = false ;
 }
 
 let counterTime=0;
 
 Process.prototype.increament = function(tableRow,tableRowUnit,tableRowTime,timer,q){
     if(Number(this.leftToArrive) <= 0){
        let sub = Number(this.executionTime) - this.tourniquet ;
        switch(sub){  
           case 0 : timer[q] = 0;
            break ;       
           case 1 : {
               this.tourniquet ++ ;
               let blan = document.createElement("td");
               if(Number(this.executionTime) - this.tourniquet===0) blan.textContent = this.name + " (End)";
               else blan.textContent = this.name ;
               tableRow.appendChild(blan);
               let blan2 = document.createElement("td");
               blan2.textContent = "1" ;
               tableRowUnit.appendChild(blan2); 
               let blan3 = document.createElement("td");
               counterTime ++ ;
               blan3.textContent = (counterTime-1) +" - "+ counterTime ;
               tableRowTime.appendChild(blan3); 
 
 
               timer[q] = 1;
               break ;
             }     
           default : {
               this.tourniquet += 2 ; 
               let blan = document.createElement("td");
               if(Number(this.executionTime) - this.tourniquet===0) blan.textContent = this.name + " (End)";
               else blan.textContent = this.name ;
               tableRow.appendChild(blan); 
               let blan2 = document.createElement("td");
               blan2.textContent = "2" ;
               tableRowUnit.appendChild(blan2);
               let blan3 = document.createElement("td");
               counterTime += 2 ;
               blan3.textContent = (counterTime-2)+" - "+ counterTime ;
               tableRowTime.appendChild(blan3);  
               timer[q] = 2;
               break ;
             }         
        }
        if(sub === 0) this.End = true ; 
     }
         
 }
 
 
 Process.prototype.decreament = function(k){
    if(Number(this.leftToArrive) > 0){
     switch(Number(this.leftToArrive)){         
           case 1 : {this.leftToArrive -=(k+1) ; break ;}        
           default : {this.leftToArrive -=(k+2) ; break ;}
        }
    }
  }
 
  function sum(arr){
      let s = 0;
      for(let i=0;i<arr.length;i++){
          s+=arr[i];
      }return s;
  }
 
 let timer = [0] , array = [""];
 
 //ici c est pour creer la list des options pour choisir le nbr des Process
 let choice = document.getElementById("choice");
         for (let i = 0; i < 10; i++) {
             let theOption = new Option;
             theOption.text = i+1;
             theOption.value = i+1;
             choice.options[i] = theOption;
         }
 
 
 function jumpToNext(){
     let n = choice.value;
     let e = document.getElementById("premier");
     let body = document.getElementById("body");
     body.removeChild(e);
 
     let choicesTable = document.createElement("table");
     body.appendChild(choicesTable);
     let containerHead = document.createElement("tr"); choicesTable.appendChild(containerHead);
     let name = document.createElement("th"); name.textContent = "Name" ; containerHead.appendChild(name);
     let tArr = document.createElement("th"); tArr.textContent = "Arriving Instant" ; containerHead.appendChild(tArr);
     let tEx = document.createElement("th"); tEx.textContent = "Execution Time" ; containerHead.appendChild(tEx);
 
     for(let j = 0; j<n;j++){
 
         let containerData = document.createElement("tr");
         choicesTable.appendChild(containerData);
 
         let dataName = document.createElement("td"); containerData.appendChild(dataName); 
         dataName.textContent = "P" + j ; dataName.id = "P" + j
 
         let dataTempArr = document.createElement("td"); containerData.appendChild(dataTempArr);
         let insererTempArr = document.createElement("input"); dataTempArr.appendChild(insererTempArr); 
         insererTempArr.id = "iTA" + j ;
         
         let dataTempEx = document.createElement("td"); containerData.appendChild(dataTempEx);
         let insererTempEx = document.createElement("input"); dataTempEx.appendChild(insererTempEx);
         insererTempEx.id = "iTE" + j ;
     }
     
 
     let sortie = document.createElement("table");
     body.appendChild(sortie);
     let tableRow = document.createElement("tr");
     sortie.appendChild(tableRow);
     let tableRowUnit = document.createElement("tr");
     sortie.appendChild(tableRowUnit);
     let tableRowTime = document.createElement("tr");
     sortie.appendChild(tableRowTime);
     let check = document.createElement("button");
     check.textContent = "CHECK";
     check.onclick = function(){
         for(j=0;j<n;j++){
             let process = new Process(document.getElementById("P" + j).textContent , document.getElementById("iTA" + j).value , document.getElementById("iTE" + j).value);
             array[j] = process ;
         }counterTime += Number(array[0].arrivingInstant)
             //ici on applique une simple insertion sort pour ordonner les element depond de temp d arriver
                 for (let k = 1; k < array.length; k++) {
                     let l = k - 1 ;
                     let temp = array[k] ;
                         while (l >= 0 && Number(array[l].arrivingInstant) > Number(temp.arrivingInstant)) {
                             array[l + 1] = array[l] ;
                              l-- ;
                             }
                             array[l+1] = temp ;
                         }
                     
         let s = 0;  
         
         while(s < array.length){
             let k = 0;
             let q=0;
             k+=sum(timer);
             
             for(let y=0;y<array.length;y++){
             if(array[y].End === false){
               array[y].decreament(k) ;
              }                       
             }
             timer = [0];
             for(let y=0;y<array.length;y++){
             if(array[y].End === false){
               array[y].increament(tableRow,tableRowUnit,tableRowTime,timer,q) ; q++;
               
               if(array[y].End === true) {s ++ ;} 
              }                        
             }            
         }
         body.removeChild(check);
         let tryA = document.createElement("button");
         tryA.textContent = "Try Again";    
         body.appendChild(tryA);
         tryA.onclick = function(){location.reload();}
 }
     body.appendChild(check);
     
 }
 
 