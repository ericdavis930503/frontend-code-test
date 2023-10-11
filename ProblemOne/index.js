var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
      'room_no': 'A0073',
      'some_array': [7, 2, 4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
];

function mutateArray(a) {
  //--- 1. Update the `mutateArray` function to return `a` as a flattened array ---//
  const flattenObject = (obj) => {
    if (typeof obj !== 'object') return; // we do not anything if obj is not an object
    Object.keys(obj).forEach((key) => {
      flattenObject(obj[key]); // we should update each element into a flattened one
      if (!Array.isArray(obj) && typeof obj[key] === 'object' && !Array.isArray(obj[key])) { // if we need to flatten
        //remove the current item & save it's data as temporary
        let temp = obj[key];
        delete obj[key];
        // flatten it
        Object.keys(temp).forEach((subKey) => {
          obj[subKey] = temp[subKey];
        })
      }
    })
  }
  // recursively flatten
  flattenObject(a);
  //----------------------------------------------------------------------------//

  //--- 2. Update the `mutateArray` function so that the 'some_array' attribute in each item of the mutated array is changed to the sum of the array called 'some_total' ---//
  for (item of a) {
    item['some_total'] = item['some_array'].reduce((acc, cur) => acc + cur, 0);
    delete item['some_array'];
  }
  //----------------------------------------------------------------------------//

  //--- 3. Update the `mutateArray` function so that the resulting array only includes objects with a guest_type of 'guest' ---//
  a = a.filter((item) => item['guest_type'] === "guest");
  //----------------------------------------------------------------------------//

  return a;
}

$(document).ready(function () {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
