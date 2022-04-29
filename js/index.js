const form = document.querySelector('#github-form')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //data we want to pass from the form
  //e.target[0].value;
  fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(resp => resp.json())
    .then(data => {
      //username(login), avatar_url, profile (url) 
      const userList = document.querySelector('#user-list')
      const reposList = document.getElementById('repos-list')
      reposList.innerHTML = "";
      userList.innerHTML = "";

      data.items.map(item => {
        const li = document.createElement("li")
        const h2 = document.createElement("h2")
        h2.textContent = item.login

        h2.addEventListener("click", e => showUserRepos(item.login, e))
        const img = document.createElement("img")
        img.src = item.avatar_url
        // const a = document.createElement("a")
        // a.href = item.url
        // a.innerText = item.url

       
        li.append(h2, img)
        userList.append(li)
      })
      // e.target[0].value = "" => this will only work for 1 form input, form.rest() is better for mulitple form inputs
    })

    form.reset()
})

function showUserRepos(username, e) {
  const reposList = document.getElementById('repos-list')
  reposList.innerHTML = "";
  e.preventDefault()
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => {
      resp.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement('h1')
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
      })
    })
}

// When the form in submitted, it should take the value of the
// input and search GitHub for user matches using the 
//[User Search Endpoint](#user-search-endpoint).



//Using the results of the search, display information about 
//the users to thepage. (You might include showing their 
//username, avatar and a link to their profile.)



//Clicking on one of these users should send a request to the
//[User Repos Endpoint](#user-repos-endpoint) and return data 
//about all the repositories for that user.


//Using the response from the Users Repos Endpoint, display 
//all the repositories for that user on the page.