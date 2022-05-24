 <template>
    <header id="masthead" class="site-header remmember-item">
		<div class="wrap-header-content">
			<a href="https://remember.bio/" class="site-branding">
				<img :src="require('@/assets/images/blue-logo.svg')"  alt="remember bio logo image">
			</a>
			<nav id="site-navigation" class="main-navigation">
				<div class="menu-menu-1-container">
					<ul id="primary-menu" class="menu nav-menu">
						<li id="menu-item-1" class="menu-item current" ><a class="disabled">Main</a></li>
						<li id="menu-item-2" class="menu-item"><a class="disabled">About</a></li>
						<li id="menu-item-3" class="menu-item"><a class="disabled">Stories</a></li>
						<li id="menu-item-4" class="menu-item"><a class="disabled">Gallery</a></li>
						<li id="menu-item-6" class="menu-item"><a class="disabled">Places Of Commemoration</a></li>
						<li id="menu-item-7" class="menu-item">
							<a href="">
							Candle And Flowers
							</a>
						</li>
						<li id="menu-item-8" class="menu-item"><a class="disabled">The Grave</a></li>
					
					</ul>
				</div>
				
			</nav><!-- #site-navigation -->
			<div class="share-btn">
				<a href="" target="_blank" class="email disabled">
				 <img :src="require('@/assets/images/share/email.svg')"  alt="email icon">
				</a>
				<a href="" target="_blank" class="facebook disabled">
				 <img :src="require('@/assets/images/share/facebook.svg')"  alt="facebook icon">
				</a>
				<a href="" target="_blank" class="instegram disabled">
				 <img :src="require('@/assets/images/share/instegram.svg')"  alt="instegram icon">
				</a>
				<a href="" target="_blank" class="twitter disabled">
				 <img :src="require('@/assets/images/share/twiter.svg')"  alt="twitter icon">
				</a>
				<a href="" id="qr-code-download" class="disabled">
                    <img :src="require('@/assets/images/share/qr.svg')"  alt="download qr">
				</a>
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
				    <img :src="require('@/assets/images/open-menu-mobile.svg')"  alt="open menu">
                </button>
			</div>
			<div id="qr-code-container" style="display:none;"></div>
		</div>
	</header><!-- #masthead -->
</template>

<script>
import "@/assets/css/headerRememberPage.css";

export default {
  name: "RPHeader",
};
</script>

<style>
</style>

 