// Fake API feature
const fakeApiCall = async function (endpoint) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch data.');
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
