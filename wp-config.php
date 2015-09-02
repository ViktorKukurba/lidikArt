<?php
/**
 * Основные параметры WordPress.
 *
 * Этот файл содержит следующие параметры: настройки MySQL, префикс таблиц,
 * секретные ключи, язык WordPress и ABSPATH. Дополнительную информацию можно найти
 * на странице {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Кодекса. Настройки MySQL можно узнать у хостинг-провайдера.
 *
 * Этот файл используется сценарием создания wp-config.php в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать этот файл
 * с именем "wp-config.php" и заполнить значения.
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'lidikart_base');

/** Имя пользователя MySQL */
//define('DB_USER', 'lidikart_base');
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
//define('DB_PASSWORD', 'lidikart12345');
define('DB_PASSWORD', 'pmwork1122');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется снова авторизоваться.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '>3d06.|lg77)@E$97B2:(#&mkl<cm1i2kcb#`9[WW6X]W.]+ZRyMdxs^T`5&)~Fv');
define('SECURE_AUTH_KEY',  'j%*utOY%-8JjIN)}WW;.;0C5TRf+X (9FG+2b gd[#AbmRqoYs%!q;Cj+S~_(uWo');
define('LOGGED_IN_KEY',    '>qo*ryUr9uszw@1~GB^rmT*ESwS66E9o>_QYMYx*-S-:q*w5e8sUDt|3|:2L.2MT');
define('NONCE_KEY',        'QI/|FJ:8]5v~|YO_S]71uw2;Y-}JP%FH}=-Z%YhNy-Q=J3 fn-]#VGrPDV_+`S_g');
define('AUTH_SALT',        'ZV,yba4XcdDs3fr~4j&lzfcREe{3<evDLKzh$Z!u9r=DJjT~4Ms)S/TRD4TvWm2N');
define('SECURE_AUTH_SALT', 'Lei3kXs6F<M#[nd{.S8;qT5W{Jt PAe|$AodI2C?)EZ{dTK7xGeHoo(i6r?yRi{+');
define('LOGGED_IN_SALT',   '-Rm0EisDCb_}!#:yw/wc[e;>G,*(;}x-L#K} @p!2xA%VO}hx<a^_i,gLH.H0G>u');
define('NONCE_SALT',       '-uvG-6-J=Ut8hK*Fz:+AdDQfvi8f.;ye,-_Sp:vIrwXko}4-X 9.92pCz-5Nem/3');
define( 'WP_AUTO_UPDATE_CORE', false );
define( 'AUTOMATIC_UPDATER_DISABLED', true );

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько блогов в одну базу данных, если вы будете использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Язык локализации WordPress, по умолчанию английский.
 *
 * Измените этот параметр, чтобы настроить локализацию. Соответствующий MO-файл
 * для выбранного языка должен быть установлен в wp-content/languages. Например,
 * чтобы включить поддержку русского языка, скопируйте ru_RU.mo в wp-content/languages
 * и присвойте WPLANG значение 'ru_RU'.
 */
define('WPLANG', 'ru_RU');

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Настоятельно рекомендуется, чтобы разработчики плагинов и тем использовали WP_DEBUG
 * в своём рабочем окружении.
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');

define( 'WP_TEMP_DIR' , ABSPATH . 'wp-content/' );

if(is_admin()) {
    add_filter('filesystem_method', create_function('$a', 'return "direct";' ));
    define( 'FS_CHMOD_DIR', 0751 );
}

//define('WP_MEMORY_LIMIT', '64MB');

//define( 'UPLOADS', '/home/lidikart/domains/lidikart.com.ua/public_html/wp-content/uploads' );

