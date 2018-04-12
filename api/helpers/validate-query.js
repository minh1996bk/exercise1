module.exports = {


  friendlyName: 'Validate query',


  description: '',


  inputs: {
    string: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done
    let regexp = /\W/;
    let outputCheck = regexp.test(inputs.string);
    return exits.success(!outputCheck);

  }


};

