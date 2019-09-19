declare module "mjml-r" {
  function mjmlR(templatesPath: string, genAtPath: string, ignoreFiles?: Array<string>, clearOldGens?: boolean): void;
  export default mjmlR;
}
