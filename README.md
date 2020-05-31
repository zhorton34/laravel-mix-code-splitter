<img src="https://img.icons8.com/fluent/28/000000/idea.png"></img>
![Version](https://img.shields.io/npm/v/laravel-mix-code-splitter.svg?color=success&logo=npm)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?color=success&logo=github)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
<img src="https://img.icons8.com/fluent/28/000000/idea.png"></img> 

---

# <img src="https://img.icons8.com/fluent/38/000000/download.png"/> Install

---


### <img src="https://img.icons8.com/color/21/000000/npm.png"/>  NPM

```bash
npm install --save-dev laravel-mix-code-splitter
```

### <img src="https://img.icons8.com/color/21/000000/clew.png"/> Yarn

```bash
yarn add laravel-mix-code-splitter --save
```



---

## <img src="https://img.icons8.com/fluent/42/000000/ok.png"/> Purpose

---


- [x] **Split Code**
- [x] **Improve Apps**
- [x] **Improve User Lives**
- [x] **Improve Developer Lives**
- [x] **Hook Into Laravel Mix without Losing any original, core logic**


---

## <img src="https://img.icons8.com/cotton/58/000000/hot-coffee--v1.png"/> Laravel Mix Code Splitter

---

**Definition from google**

---

#### _"Modern sites often combine all of their JavaScript into a single, large bundle. ... An alternative to large bundles is code-splitting, which is where JavaScript is split into smaller chunks. This enables sending the minimal code required to provide value upfront, improving page-load times. The rest can be loaded on demand."_

---


---

## Setup

---

**1. webpack.mix.js**

---

```js
let mix = require('laravel-mix');
require('laravel-mix-code-splitter');

/** Normally, we create a single global file -- available on all pages **/
mix.js('resources/js/app.js', 'public/js/app.js')

  /*----------------------------------------------------------
   | Code splitting allows us to "split" our code up.
   *----------------------------------------------------------
   |  
   | -> resources   
   |    . /js/split/home.js       
   |    . /js/split/badges.js
   |    . /js/split/invoices.js
   |         
   */  
   .split(mix.js, 'resources/js/split', 'public/js/split') 

   /*----------------------------------------------------------------------------
 	| Providing splits of our code for each page or feature specific page
 	*----------------------------------------------------------------------------
 	|  
 	| -> public  
 	|    . /js/split/home.js
 	|    . /js/split/badges.js
 	|    . /js/split/invoices.js
 	|
 	*/
```

---

### **2. Cool, cool -- sound great, how do we actually "code split" within Laravel?**

---

**_After_ mix does its thing, there's _multitudes_ of ways to dynamically load the proper split for the current route ~ here's a simpler implementation I personally like**

---

**routes/web.php**

---

**_Add names to your routes, we'll use resourceful routes to speed the example up_** 

---

```php
Route::resource('home', 'HomeController')->home('home');
Route::resource('badges', 'BadgesController')->name('badges');
Route::resource('invoices', 'InvoiceController')->name('invoices');
```

---

**_Add snippet to your primary layout blade file_**

---

**resources/views/layouts/app.blade.php**

---

- First we load our js (**app.js**)
- Then we check if there is a code split
- If there is a code split for the current route resource group, we load it

```php

<script src="{{ asset('js/app.js') }}"></script>

@if (asset( "js/split". Str::of(Route::currentRouteName())->before('.')->append('.js') ))
	<script src="{{ asset( Str::of(Route::currentRouteName())->before('.')->start('js/split')->finish('.js') ) }}"></script>
@endif
```


---

**home.js loads on visits to**

---

- /home
- /home/{id}
- /home/create
- /home/{id}/edit



---

**badges.js loads on visits to**

---

- /badges
- /badges/{id}
- /badges/create
- /badges/{id}/edit



---

**invoices.js loads on visits to**

---

- /invoices
- /invoices/{id}
- /invoices/create
- /invoices/{id}/edit



---

**app.js loads on every page**

---


---

## **Code splitting non-js files**

---


```js
let mix = require('laravel-mix');
require('laravel-mix-code-splitter');

mix

.js('resources/js/app.js', 'public/js/app.js')
.split(mix.js, 'resources/js/split', 'public/js/split') 


.css('resources/js/app.css', 'public/css/app.css')
.split(mix.css, 'resources/css/split', 'public/css/split')

.css('resources/js/app.css', 'public/css/app.css')
.split(mix.css, 'resources/css/split', 'public/css/split')

.postCss('resources/css/main.css', 'public/css', [require('precss')()])
.split(mix.postCss, 'resources/css', 'public/css/split', [require('precss')()])

// etc...
```


