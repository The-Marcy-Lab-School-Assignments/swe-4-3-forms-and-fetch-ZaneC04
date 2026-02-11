# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:**
- The bug in this code is that the first `.then()` never **returns** the `readingPromise` variable. As a result, the `response.json()` is never sent to the next `.then()`. 
- The fix to this is by simply adding a `return` statement. This is demonstrated below:
```js
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
    return readingPromise;
  })
  .then((data) => {
    console.log(data); // shows our json file!
  })
  .catch((error) => console.error(error.message));
```

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**
- The reason the `<script type="module">` tag and `fetch()` call fail is because by opening the `index.html` file in the browser, the browser uses the `file://` protocol for the page. As a result, this causes a CORS (Cross-Origin Resource Sharing) error and cannot fetch data from third-party APIs over the internet. 
- What this student should do instead is use a **development server**, as using one can simulate having the `http://` protocol, and be able to use modules and API calls. 

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:**
- We check `response.ok` before reading the response's body as this catches if the fetch fails to retrieve data. 
- This catches errors such as the URL being correct, but the API being down as `response.ok` will evaluate as `false`.
- In the code above, without `response.ok` being checked, the response will have no data to be parsed into `json`, but still attempt to be parsed. 


## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**
```js
const getJoke = async () => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart')
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const responseData = await response.json();
    return { data: responseData, error: null };
  }
  catch (error) {
    return { data: null, error };
    };
};
```


## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener('submit', (event) => {
  const name = form.elements.name.value;
  document.querySelector('#output').textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:**
- The issue here is that since the student did not use `event.preventDefault()` in the event listener, the browser follows its default action by either reloading or redirecting. As a result, the browser will do one of these actions and never display the data. 
- To fix this, the student should add `event.preventDefault()` to the beginning of the event listener's body and prevent a reload or redirect.


## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**
- J. Create the HTML form with a name input and output elements for displaying results
- E. Add a `'submit'` event listener to the form
- B. Call `event.preventDefault()` to stop the page from reloading
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- C. Check `response.ok` and throw an error if the response failed
- A. Parse the response body with `await response.json()`
- F. Handle errors in the `catch` block (display an error message)
- D. Update the DOM with the Pokemon's data
- I. Reset the form with `form.reset()`


