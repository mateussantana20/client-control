module.exports = {
  age: (timestamp) => {
    const today = new Date; // Date atual
    const birthDate = new Date(timestamp); //Data do animeversario
    //2020 - 1984  = 36
    let age = today.getFullYear() - birthDate.getFullYear() // Pegando ano todo
    const month = today.getMonth() - birthDate.getMonth() //pegando o mes
    
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1;
    }
  
    return age
  },

  date: (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();

    const month = `0${date.getUTCMonth() + 1}`.split(-2);

    const day = `0${date.getUTCDate()}`.split(-2);

    return  {
      iso: `${year}-${month}-${day}`,
      format: `${day}/${month}/${year}`
    }
  },

  numberPhone: (number) => {
    const ddd = `${number}`.substr(0,2)
    const rest = `${number}`.substr(2)
    return `(${ddd}) ${rest}`
  
    // console.log(`(${ddd})${rest}`)
  }

}