<nav>
  <div id="logo">bulledjurnal</div>

  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/planner">Planner</a></li>
    <li><a href="/calendar">Calendar</a></li>
    <li><a href="/collections">Collections</a></li>
  </ul>

  <div id="usermenu">usermenu</div>
</nav>

<slot />

<style>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #logo {
    line-height: 6vh;
    padding: 14px 16px;
    text-align: center;
  }

  #usermenu {
    display: block;
    line-height: 6vh;
    padding: 14px 16px;
    text-align: center;
  }

  ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    list-style-type: none;
    background-color: #333;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    line-height: 6vh;
    padding: 14px 16px;
    text-decoration: none;
  }
  li a:hover {
    background-color: #111;
  }
</style>
