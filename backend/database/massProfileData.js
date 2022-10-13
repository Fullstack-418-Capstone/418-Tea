const randomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const randomizer = Math.floor(Math.random() * 26);
    const letter = alphabet.charAt(randomizer);
    return letter;
};
 
const randomCapsLetter = () => {
    const letter = randomLetter().toUpperCase();
    return letter;
};
 
const createName = () => {
    const length = Math.floor(Math.random() * 9) + 1;
    let name = randomCapsLetter();
    for (let i = 0; i < length; i++) {
    name += randomLetter();
    }

return name;
};
 
const createPassword = () => {
    const length = Math.floor(Math.random() * 10) + 8;
    let password = "";

    for (let i = 0; i < length; i++) {
    if(Math.floor(Math.random() * 2)){
        password += Math.floor(Math.random() * 10);
    } else if(Math.floor(Math.random() * 2)){
        password += randomLetter();
    } else {
        password += randomCapsLetter();
    }
    }
return password;
};

const createEmail = () => {
    return createName() + "@gmail.com";
}

const createCity = () => {
    let city = ""
    if(Math.floor(Math.random() * 2)){
        city = createName();
    } else {
        city = createName() + " " + createName();
    };
    return city;
}

const createAddress1 = () => {
    let numbers = "";
    const randomizer = Math.floor(Math.random() * 6);
    const cardinalDirections = ['N', 'S', 'E', 'W'];
    const cardinal = cardinalDirections[Math.floor(Math.random() * 4)];
    const streetName = createCity();

    for (let i = 0; i <= randomizer; i++){
        numbers += Math.floor(Math.random() * 10);
    };

    const address1 = numbers + ' ' + cardinal + ' ' + streetName;
    return address1;
}

const createState = () => {
    state = randomCapsLetter() + randomCapsLetter();
    return state
};

const createZipcode = () => {
    let zipcode = "";
    for(let i = 0; i <= 5; i++){
        zipcode += Math.floor(Math.random() * 10)
    };
    return zipcode;
}

const createAddress = () => {
    address = {
        address1: createAddress1(),
        city: createCity(),
        state: createState(),
        zipcode: createZipcode()
    };

    return address;
};

const createRandomUser = () => {
    user = {
        username: createName(),
        password: createPassword(),
        firstname: createName(),
        lastname: createName(),
        email: createEmail(),
        address: createAddress()
    };

    return user;
}

module.exports = { createRandomUser }