class RuleModel{
    
    constructor(contextId,businessType,numberOfContent,designation,defaultRule,contentType){
        this.ContextId=contextId;
        this.BusinessType=businessType;     
        this.NumberOfContent=numberOfContent;
        this.Designation=designation;
        this.DefaultRule=defaultRule;
        this.ContentType=contentType;
    }
}
export default RuleModel;