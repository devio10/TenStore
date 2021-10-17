function scrollableBlocks() {
  let previousTop=ab.style.top;
  let abIndex=document.getElementById('ab-main_content');
  abIndex.onscroll=function(){
    positions=abIndex.scrollTop;
    if (positions > 60) {
      positions=60;
      ab.style.borderRadius='0';
    }
    let newTop=60 - positions;
    ab.style.height='calc(100% - '+newTop+'px)';
    let scrPerc = positions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    abIndex.style.borderTopLeftRadius=newbRadius+'px';
    abIndex.style.borderTopRightRadius=newbRadius+'px';
    ab.style.borderTopLeftRadius=newbRadius+'px';
    ab.style.borderTopRightRadius=newbRadius+'px';
  };
  let abNR=document.getElementById('ab-new_review');
  abNR.onscroll=function(){
    nrpositions=abNR.scrollTop;
    if (nrpositions > 60) {
      nrpositions=60;
    }
    let newTop=60 - nrpositions;
    ab.style.height='calc(100% - '+newTop+'px)';
    let scrPerc = nrpositions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    abNR.style.borderTopLeftRadius=newbRadius+'px';
    abNR.style.borderTopRightRadius=newbRadius+'px';
    ab.style.borderTopLeftRadius=newbRadius+'px';
    ab.style.borderTopRightRadius=newbRadius+'px';
  };
}
function scrollableList() {
  let listPositions;
  let previousTopList=list.style.top;
  mainScrn.onscroll=function(){
    listPositions=mainScrn.scrollTop;
    if (listPositions > 60) {
      listPositions=60;
    }
    let newTopList=60 - listPositions;
    list.style.height='calc(100% - '+newTopList+'px)';
    let scrPerc = listPositions / (60 / 100);
    let newbRadius=16 - (16 / 100 * scrPerc);
    mainScrn.style.borderTopLeftRadius=newbRadius+'px';
    mainScrn.style.borderTopRightRadius=newbRadius+'px';
    list.style.borderTopLeftRadius=newbRadius+'px';
    list.style.borderTopRightRadius=newbRadius+'px';
  };
}
function scrollableUB() {
  let ubpositions;
  let previousTopub=ubObj.style.top;
  let ubIndex=document.getElementById('ub-main');
  ubIndex.onscroll=function(){
    ubpositions=ubIndex.scrollTop;
    if (ubpositions > 60) {
      ubpositions=60;
      ubObj.style.borderRadius='0';
      ubIndex.style.borderRadius='0';
    } else {
      ubObj.style.borderTopLeftRadius='16px';
      ubObj.style.borderTopRightRadius='16px';
      ubIndex.style.borderTopLeftRadius='16px';
      ubIndex.style.borderTopRightRadius='16px';
    }
    let ubnewTop=60 - ubpositions;
    ubObj.style.height='calc(100% - '+ubnewTop+'px)';
  };
}
function scrollableSets() {
  let setpositions;
  let previousTopset=setObj.style.top;
  let setIndex=document.getElementById('set-main');
  setIndex.onscroll=function(){
    setpositions=setIndex.scrollTop;
    if (setpositions > 60) {
      setpositions=60;
      setObj.style.borderRadius='0';
      setIndex.style.borderRadius='0';
    } else {
      setObj.style.borderTopLeftRadius='16px';
      setObj.style.borderTopRightRadius='16px';
      setIndex.style.borderTopLeftRadius='16px';
      setIndex.style.borderTopRightRadius='16px';
    }
    let setnewTop=60 - setpositions;
    setObj.style.height='calc(100% - '+setnewTop+'px)';
  };
}
