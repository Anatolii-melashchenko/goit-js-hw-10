export default function fetchCountries(name) {
  const filter = new URLSearchParams({
    fields: ['name', 'capital', 'population', 'flags', 'languages'],
  });

  return fetch(`https://restcountries.com/v3.1/name/${name}?${filter}`).then(
    response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}. ${response.statusText}`);
      }
      return response.json();
    }
  );
}
