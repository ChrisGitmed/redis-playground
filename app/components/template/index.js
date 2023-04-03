class Template {
  static get = async () => {
    console.log('get');
    return 'get';
  };

  static create = async () => {
    console.log('create');
    return 'create';
  };

  static update = async () => {
    console.log('update');
    return 'update';
  };

  static destroy = async () => {
    console.log('delete');
    return 'delete';
  };
}

export { Template };

