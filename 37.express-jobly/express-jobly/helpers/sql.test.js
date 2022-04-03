const { sqlForPartialUpdate } = require('./sql');

describe('sqlForPartialUpdate', () => {
  test('Update 1 item', function (){
    const results = sqlForPartialUpdate(
      { f1: 'v1' },
      { f1: 'f1', fF2: 'f2' }
    );
    expect(results).toEqual(
      { setCols: "\"f1\"=$1", values: ['v1'] }
    );
  });
});