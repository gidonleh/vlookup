let a=[];
let b=[];

document.getElementById("demo1").onchange = (evt) => {
    // (A) NEW FILE READER
    let reader = new FileReader();
   
    // (B) ON FINISH LOADING
    reader.addEventListener("loadend", (evt) => {
      // (B1) GET THE FIRST WORKSHEET
      let workbook = XLSX.read(evt.target.result, {type: "binary"}),
          worksheet = workbook.Sheets[workbook.SheetNames[0]],
          range = XLSX.utils.decode_range(worksheet["!ref"]);
   
      // (B2) READ CELLS IN ARRAY
      let data = [];
      for (let row=range.s.r; row<=range.e.r; row++) {
        let i = data.length;
        data.push([]);
        for (let col=range.s.c; col<=range.e.c; col++) {
          let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
          data[i].push(cell.v);
        }
      }
      a = [...data];
      
      console.log(data);
    });
   
    // (C) START - READ SELECTED EXCEL FILE
    reader.readAsArrayBuffer(evt.target.files[0]);
    
  };

  document.getElementById("demo2").onchange = (evt) => {
    // (A) NEW FILE READER
    let reader = new FileReader();
   
    // (B) ON FINISH LOADING
    reader.addEventListener("loadend", (evt) => {
      // (B1) GET THE FIRST WORKSHEET
      let workbook = XLSX.read(evt.target.result, {type: "binary"}),
          worksheet = workbook.Sheets[workbook.SheetNames[0]],
          range = XLSX.utils.decode_range(worksheet["!ref"]);
   
      // (B2) READ CELLS IN ARRAY
      let data = [];
      for (let row=range.s.r; row<=range.e.r; row++) {
        let i = data.length;
        data.push([]);
        for (let col=range.s.c; col<=range.e.c; col++) {
          let cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
          data[i].push(cell.v);
        }
      }
      b = [...data];
      
      console.log(data);
    });
   
    // (C) START - READ SELECTED EXCEL FILE
    reader.readAsArrayBuffer(evt.target.files[0]);
    
  };
  function countDigit(n)
  {
      let count = 0;
      while (n != 0)
      {
          n = Math.floor(n / 10);
          ++count;
      }
      return count;
  }

  // const writeToTable = (y) => {
  //   if(y=="first_table") {
  //     if (a.length===0) alert('please pick an excel table');
  //   }  
  //   else if (b.length===0) alert('please pick an excel table');
  //   else {
  //     console.log(vlookup(a,b));
  //         }
   
  // }

  ///// CREATE EXCEL /////
  function createExcel(){

  let wb = XLSX.utils.book_new();
  wb.Props = {
          Title: "Result",
          Subject: "Vlookup Result",
          Author: "Gadi Lehmann"
        };
          wb.SheetNames.push("Test Sheet");
  let ws_data = [vlookup(a,b)];
  let ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Test Sheet"] = ws;

  let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
  function s2ab(s) {

          let buf = new ArrayBuffer(s.length);
          let view = new Uint8Array(buf);
          for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
          
  }
 
          saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
 
}
  // carete ID array (8 or 9 digits)

  const findID = (arr) => {

    let count = 0;
    for(let i = 0; i < arr[0].length; i++) {
      console.log(arr[0][i]);
      if ( (arr[0][i]=="זהות")){
      count=i;
      break;
    }
    console.log(count);
    }
    let resArr = [];
    for (let i = 1; i < arr.length; i++) {
      resArr.push(arr[i][count]);
    }
    return resArr;
  }

  // mimicing excel's vlookup function
  const vlookup = (hrTable, myTable) => {
    let hr = [], usrs = [];
 
    let rowcount = 0;
    let Array2D = (r,c) => [...Array(r)].map(_=>Array(c).fill(0));
    let res = Array2D(1,myTable.length);

    hr = findID(hrTable); // only ID numbers
    usrs = findID(myTable); // only ID numbers
    console.log('hr: ' + hr);
    console.log('users: ' + usrs);

    for (let i = 0; i < usrs.length; i++) {

      for (let j = 0; j < hr.length; j++) {
        if (usrs[i]==hr[j]){
        res[rowcount]=usrs[i];
        rowcount++;
      }
      }
    }
    console.log('res: ' + res);
    return res;
  }

