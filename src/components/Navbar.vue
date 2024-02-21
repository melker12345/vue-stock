<template>
    <header class="navbar">
        <div>
            <button id="theme-toggle" @click="toggleTheme()">◑</button>
        </div>

        <ul class="nav-button">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
        </ul>
    </header>
</template>
<script>
export default {
    name: 'Navbar',
    methods: {
        toggleTheme() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    }
};

</script>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--navbar-bg-color);
    color: var(--navbar-text-color);

}

/* Navigation Links */
.nav-links {
    width: fit-content;
    display: flex;
    gap: 20px;
}

/* Navigation Buttons */
.nav-button {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--navbar-text-color);
    margin-right: 5rem;
}

#theme-toggle {
    background-color: var(--bg-color);
    color: var(--text-color);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    font-size: 32px;
    margin-left: 2rem;

}

#theme-toggle:hover {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}

.nav-button li {

    width: fit-content;
    padding: 10px 20px;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-button li a {
    text-decoration: none;
    color: var(--button-text-color);
}

.nav-button li:hover {
    background-color: var(--button-hover-bg-color);
    color: var(--button-hover-text-color);
}

.nav-logo {
    display: flex;
    align-items: center;
}

.nav-logo a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: var(--navbar-text-color);
}

.nav-logo svg {
    margin-right: 10px;
}
</style>