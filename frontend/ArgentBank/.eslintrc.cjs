module.exports  = { 
  env : { 
      navigateur :  true , 
      es2021 :  true , 
  }, 
  extends : [ 'standard' , 'plugin:react/recommended' , 'plugin:react/jsx-runtime' , 'prettier' ], 
  remplace : [ 
      { 
          env : { 
              node :  true , 
          }, 
          fichiers : [ '.eslintrc.{js,cjs}' ], 
          parserOptions : { 
              sourceType :  'script' , 
          }, 
      }, 
  ], 
  parserOptions : { 
      ecmaVersion :  'latest' , 
      sourceType :  'module' , 
  }, 
  plugins : [ 'react' ], 
  règles : { 
      //  Personnalisez  les règles  selon  les  besoins de votre  projet 
  }
}