 <template>
  <footer id="colophon" class="site-footer remmember-item-footer" >
    <span class="text">Want to remember too?</span>
    <div class="wrap-form-footer">
      <form method="" name="registerForm" id="registerForm" action="">
          <input type="email" name="email" value="" id="email" placeholder="enter your email" >
          <button type="submit">
              <img 
              :src="require('@/assets/images/logo-form.svg')"
              alt=""
              style="width:100%">
          </button>
      </form>
    </div>
    
    <div class="remmber-footer-count-of-remmbers">
      <span class="num">000</span>
      <span class="text">People remember</span>
    </div>
  </footer><!-- #colophon -->
</template>

<script>
import "@/assets/css/footerRememberPage.css";
export default {
  name: "RPFooter",
};
</script>

<style>
</style>

 