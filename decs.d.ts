// declaring module will allow typescript to import the module
declare module 'slack-incoming-webhook' {
  // typing module default export as `any` will allow you to access its members without compiler warning
  var x: any; 
  export default x;
}