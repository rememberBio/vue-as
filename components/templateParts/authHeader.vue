 <template>
  <header id="generalHeader" class="site-header">
		<div class="wrap-header-content">
			<a href="https://remember.bio/" class="site-branding"  roll="button">
				<img :src="require('@/assets/images/blue-logo.svg')"  alt="remember bio logo image">
			</a>
			<div class="wrap-header-btns">
				<a href="https://remember.bio/search" class="wrap-serach-img" roll="button">
				  <img :src="require('@/assets/images/icons/search-icon.png')"  alt="search">
				</a>
				<div class="wrap-btns desktop-only">
          <NuxtLink to="/auth/login"  class="login">log in</NuxtLink>
          <NuxtLink to="/rp/create"  class="create">Create remeber page</NuxtLink>
				</div>
				<a href="" class="login mobile-only"  roll="button">
            <img :src="require('@/assets/images/icons/white-user-icon.svg')"  alt="user account">				
        </a>
				<button class="menu-toggle-header" aria-controls="primary-menu" aria-expanded="false" @click="toggledMenu">
          <img :src="require('@/assets/images/icons/white-menu-icon.svg')"  alt="open menu">				
        </button>
				<nav id="site-navigation" class="main-navigation" :class="{'toggled': showMenu}">

					<div class="menu-menu-1-container">
						<ul id="primary-menu" class="menu nav-menu">
							<span class="close-menu mobile-only">
                <img :src="require('@/assets/images/icons/black-x-icon.svg')"  alt="close menu"  @click="toggledMenu">
              </span>
							<li id="menu-item-1" class="menu-item"><a href="https://remember.bio/search">Find Remember Page</a></li>
							<li id="menu-item-2" class="menu-item"><NuxtLink to="/rp/create" >Creat A New Page</NuxtLink></li>
							<li id="menu-item-3" class="menu-item"><a href="https://remember.bio">Home</a></li>
							<li id="menu-item-4" class="menu-item"><a href="">About Us</a></li>
							<li id="menu-item-5" class="menu-item"><a href="">Help</a></li>
							<li id="menu-item-6" class="menu-item"><a href="">Contact Us</a></li>
							<div class="wrap-btns mobile-only">
                <NuxtLink to="/auth/login"  class="login">log in</NuxtLink>
                <NuxtLink to="/rp/create"  class="create">Create remeber page</NuxtLink>
							</div>
						</ul>
					</div>
					
				</nav><!-- #site-navigation -->
			</div>
		</div>
	</header><!-- #masthead -->
</template>

<script>
export default {
  name: "AuthHeader",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggledMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style scoped>

.main-navigation ul ul {
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
	float: left;
	position: absolute;
	top: 100%;
	left: -999em;
	z-index: 99999;
}

.main-navigation ul ul ul {
	left: -999em;
	top: 0;
}

.main-navigation ul ul li:hover > ul,
.main-navigation ul ul li.focus > ul {
	display: block;
	left: auto;
}

.main-navigation ul ul a {
	width: 200px;
}

.main-navigation ul li:hover > ul,
.main-navigation ul li.focus > ul {
	left: auto;
}

.main-navigation li {
	width: 100%;
}

.main-navigation a {
	display: block;
	text-decoration: none;
	color: black;
}

/* Small menu. */
.menu-toggle,
.main-navigation.toggled ul {
	display: block;
}

/* site header */
header#generalHeader #site-navigation li:last-of-type a {
    border-bottom: none;
}
header#generalHeader {
    height: 90px;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(255,255,255,0.13);
    display: flex;
    align-items: center;
}

header#generalHeader .wrap-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    width: 75%;
    font-size: 16px;
    color: white;
}

header#generalHeader .wrap-header-content .site-branding img {
    height: 34px;
}
#generalHeader .wrap-header-btns {width: inherit;display: flex;justify-content: flex-end;position: relative;}

header#generalHeader .wrap-serach input,footer#generalFooter .wrap-serach input {
    color: white !important;
    background:transparent;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0;
    font-size: 16px;
    width: 100%;
    line-height: 24px;
    padding: 5px 5px 5px 35px;
}


header#generalHeader .wrap-serach input::placeholder,footer#generalFooter .wrap-serach input::placeholder {
    color: white;
}

header#generalHeader .wrap-serach,footer#generalFooter .wrap-serach {
    width: 29%;
    position: relative;
}

header#generalHeader .wrap-btns a {
    color: white;
    font-size: 16px;
    line-height: 24px;
    padding: 6px 25px;
    border-radius: 19px;
    border: 1px solid var(--custom-light-blue);
    background: var(--custom-light-blue);
    margin-left: 21px;
    height: 39px;
    display: inline-block;
}

header#generalHeader .wrap-btns a.login {
	background: transparent;
    color: white;
	border-color: white;
	border-width: 2px;
}

header#generalHeader .wrap-btns a.create:before {
    margin-right: 7px;
    content: "+";
    font-size: 22px;
}

header#generalHeader .wrap-btns a.create {
    display: inline-flex;
	margin-right: 29px;
}

header#generalHeader 
.site-branding {
  display: flex;
  width: 191px;
}

a.wrap-serach-img {width: 42px;height: 42px;border: 2px solid #FFFFFF;border-radius: 50%;display: inline-grid;align-items: center;justify-content: center;}
header#generalHeader #site-navigation ul {
    top: 41px!important;
    width: 332px;
    border-radius: 10;
    max-width: 89vw;
    box-shadow: none!important;
}

button.menu-toggle-header img {width: 25px;}

header#generalHeader .custom-switchers {padding-right: 30px;}

header#generalHeader .wrap-serach:before,footer#generalFooter .wrap-serach:before {
    background-image: url(/wp-content/uploads/2022/03/Group-185.svg);
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: contain;
    bottom: 10px;
    left: 3px;
}

header#generalHeader .wrap-serach input:focus,footer#generalFooter.wrap-serach input:focus {
    box-shadow: none;
    outline: none;
}
header#generalHeader #site-navigation:not(.toggled) {display: none;}
header#generalHeader #site-navigation {position: absolute;right: 0;width: unset;}

header#generalHeader #site-navigation li a {width:100%;font-size: 16px;line-height: 19px;padding: 21px 30px;border-bottom: 1px solid #E2E2E2;;min-width: 250px;}

header#generalHeader #site-navigation ul {    
	padding-top: 0;
    position: absolute;
    right: 0;
    top: 40px
}
@media screen and (min-width: 1101px) {

	.menu-toggle {
		display: none;
	}

	.main-navigation ul {
		display: flex;
	}
}

@media screen and (max-width:1100px) {
  nav#site-navigation li a,.wrap-btns.mobile-only {
    width: 100%;
  }
  
  header#generalHeader a.login.mobile-only {width: 20px;}

	header#generalHeader #site-navigation ul {
	  top: 0 !important;
    position: fixed;
    border-radius: 0 !important;
    height: 100%;
    overflow: auto;
    justify-content: flex-start;
    gap: 0;
	}
	header#generalHeader #site-navigation li:last-of-type a {
		border-bottom: 1px solid #e2e2e2;
	}
  span.close-menu.mobile-only {
      width: 100%;
  }
	/**/
	#site-navigation .wrap-btns.mobile-only {
		flex-direction: column;
		gap: 11px;
		margin-bottom: 46px;
	}
	header#generalHeader .wrap-btns a.create {
		display: inline-flex;
		margin-right: 29px;
		justify-content: center;
	}
	#site-navigation .wrap-btns.mobile-only a {
		width: 270px;
		max-width: 90%;
		margin: auto;
	}
	#site-navigation .wrap-btns.mobile-only .login {
		color: var(--custom-light-blue);
		border-color: var(--custom-light-blue);
		text-align: center;
	}
	.main-navigation li:last-of-type {
		margin-bottom: 80px;
	}
	/**/
	header#generalHeader .wrap-serach-img {width: 20px;
		height: 20px;border-width: 1px;}
		
	header#generalHeader .wrap-serach-img img {width: 10px;}
	
	#generalHeader .wrap-header-btns {gap: 15px;align-items: center;position: unset;}
	
	header#generalHeader .custom-switchers {padding: 0;}
	
	button.menu-toggle-header img {height: 20px;width: auto;max-width: unset;}
	
	button.menu-toggle-header {height: 20px;}
	
		
	header#generalHeader #site-navigation li a {padding: 27.5px 45px 23.5px;}
  .custom-switchers.opened .wrap-drop-down {
		top: 24px;
		right: 0;
	}
	.custom-switchers span#toggle-menu-item img {
		height: 20px;
	}
	
	.custom-switchers span#toggle-menu-item {
		width: 20px;
		height: 20px;
		display: flex;
	}
	
	.custom-switchers{
		margin-top: 0;
		height: 100%;
		display: flex;
		align-items: center;
		padding-right: 0px;
	}
	header#masthead .custom-switchers {
		margin-left: auto;
		margin-right: 9px;
	}
	/* header site */
	header#generalHeader .wrap-header-content {
		width: 95%;
	}
	
	header#generalHeader .wrap-header-content .menu-toggle {
		background: transparent;
		border: none;
	}
	
	header#generalHeader .wrap-header-content .menu-toggle img {
		width: 24px;
		height: 24px;
	}
	
	header#generalHeader .wrap-header-content .site-branding img {
		height: 26px;
	}
	
	header#generalHeader {
		height: 49px;
	}
}


</style>

 