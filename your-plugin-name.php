<?php
/**
 * Plugin Name: Your Plugin Name
 * Plugin URI: http://plugin-website.com/
 * Description: Your plugin description
 * Author: your_wp_user_name
 * Author URI: http://your-website.com/
 * Version: 1.0.0
 * License: GPLv2 or later
 * Text Domain: your_text_domain
 * Domain Path: /languages/
 */

class Your_Plugin_Name {

    /**
     * Construct.
     *
     * @return void
     */
    public function __construct() {

        add_action( 'plugins_loaded', array( &$this, 'languages' ), 0 );

        // Load scripts in front-end.
        add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_scripts' ), 999 );

        // Load admin scripts.
        add_action( 'admin_enqueue_scripts', array( &$this, 'admin_scripts' ) );
    }

    /**
     * Load translations.
     *
     * @return void
     */
    public function languages() {
        load_plugin_textdomain( 'your_text_domain', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * Load admin scripts.
     *
     * @return void
     */
    function admin_scripts() {

        // Theme Options.
        wp_register_script( 'your_plugin_slug-admin', plugins_url( 'assets/js/admin.min.js', __FILE__ ), array( 'jquery' ), null, true );
        wp_enqueue_script( 'your_plugin_slug-admin' );
    }

    /**
     * Enqueue plugin scripts.
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_register_script( 'your_plugin_slug', plugins_url( 'assets/js/main.min.js', __FILE__ ), array( 'jquery' ), null, true );
        wp_enqueue_script( 'your_plugin_slug' );

        wp_register_style( 'your_plugin_slug', plugins_url( 'assets/css/style.css', __FILE__ ), array(), null, 'all' );
        wp_enqueue_style( 'your_plugin_slug' );
    }

}

$your_plugin_slug = new Your_Plugin_Name;
