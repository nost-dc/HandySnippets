

function persistStartDate(quote, quoteLines, products, operationType) {
  var quoteSd = toApexDate(quote.StartDate__c);
  var firstNextMonth = calculateFirstNextMonth(quote);

  const newLines = operationType === ADDENDUM ? quoteLines.filter(ql => !ql.record.Customer_Deal_Id__c) : quoteLines

  newLines.forEach(line => {
    if (!line.record.Start_Date_Overridden__c) {
      //start date should always be now if operation is addendum, otherwise it depends on product config
      let startDate = (operationType === ADDENDUM || products[line.Product__c].Start_Immediately__c == true) ? quoteSd : firstNextMonth;

      if (products[line.Product__c].Start_Offset_Months__c != null) {

        let offsetStart = (operationType === ADDENDUM || products[line.Product__c].Start_Immediately__c == true) ? toApexDate(addMonths(quote.StartDate__c, products[line.Product__c].Start_Offset_Months__c)) : calculateFirstNextMonth(quote, products[line.Product__c].Start_Offset_Months__c);

        startDate = offsetStart;
      }

      line.record.SBQQ__StartDate__c = startDate;
    }
  })
}

