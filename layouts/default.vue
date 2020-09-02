<template>
  <div>
    <!-- bd-navbar navbar has-shadow is-spaced -->
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">

          <nuxt-link to="/" class="navbar-item">
            <img src="~/assets/bulma-logo.png" width="112" height="28">
          </nuxt-link>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <nuxt-link to="/catalog" class="navbar-item">Catalog</nuxt-link>
            <nuxt-link to="/products" class="navbar-item">products</nuxt-link>
            <nuxt-link to="/categories" class="navbar-item">categories</nuxt-link>
            <nuxt-link to="/tags" class="navbar-item">tags</nuxt-link>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Settings
              </a>
              <div class="navbar-dropdown">
                <nuxt-link to="/" class="navbar-item">users</nuxt-link>
                <nuxt-link to="/" class="navbar-item">reports</nuxt-link>
                <nuxt-link to="/" class="navbar-item">contact</nuxt-link>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary"><strong>Sign up</strong></a>
                <a class="button is-light">Log in</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <main class="db-main">
      <div class="bd-side-background"></div>
      <div class="bd-main-container container py-3 px-3">
        <Nuxt />
      </div>
    </main>

    <footer class="footer hero is-light">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
    
    
  </div>
</template>

<script>


export default {

}
</script>

<style>

</style>
