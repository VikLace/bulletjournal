<nav>
<h1>bulledjurnal</h1>

<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/planner">Planner</a></li>
  <li><a href="/calendar">Calendar</a></li>
  <li><a href="/collections">Collections</a></li>
</ul>

<div id="usermenu">usermenu</div>

</nav>

<slot>

</slot>

<style>
  nav{
    display: flex;
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-between;
  }

  h1{
    display: block;
  }

  #usermenu{
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* Change the link color to #111 (black) on hover */
  li a:hover {
    background-color: #111;
  }
</style>