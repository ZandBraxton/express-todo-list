const bcrypt = require("bcrypt");

const encryptPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject): void => {
    bcrypt.genSalt(10, (err: any, salt: any)  {
        if (err) {
            reject(err)
            return false
        }
        bcrypt.hash(password, salt, (err: any, hash: string | PromiseLike<string>) => {
            if (err) {
                reject(err)
                return false
            }
            resolve(hash)
            return true
        })
    })
  });


  const comparePassword = (password: string, hash: string): Promise<string> =>
  new Promise( async (resolve, reject) => {
      try {
        const isMatch = await bcrypt.compare(password, hash)
        resolve(isMatch)
        return true
      } catch (err) {
          reject(err)
          return false
      }
   
  });
  
  



  export {encryptPassword, comparePassword}
