// Authentication helpers for signup/login using Firebase Auth (compat)

(function() {
    function $(selector, root) {
        return (root || document).querySelector(selector);
    }

    function on(el, event, handler) {
        if (el) el.addEventListener(event, handler);
    }

    function saveUserProfileToLocal(email, profile) {
        try {
            var key = 'profile:' + email.toLowerCase();
            localStorage.setItem(key, JSON.stringify(profile));
        } catch (e) {
            console.warn('Failed to save profile to localStorage', e);
        }
    }

    function readUserProfileFromLocal(email) {
        try {
            var key = 'profile:' + (email || '').toLowerCase();
            var raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    // SIGNUP PAGE
    function bindSignup() {
        var form = document.querySelector('.form-card form');
        if (!form) return;

        on(form, 'submit', function(e) {
            e.preventDefault();
            var username = $('#username');
            var email = $('#email');
            var password = $('#password');
            var teach = $('#teach');
            var learn = $('#learn');

            var emailVal = email && email.value.trim();
            var passwordVal = password && password.value.trim();

            if (!emailVal || !passwordVal) return;

            firebaseAuth.createUserWithEmailAndPassword(emailVal, passwordVal)
                .then(function(cred) {
                    var profile = {
                        uid: cred.user.uid,
                        username: (username && username.value.trim()) || '',
                        email: emailVal,
                        teachSkill: (teach && teach.value.trim()) || '',
                        learnSkill: (learn && learn.value.trim()) || ''
                    };
                    saveUserProfileToLocal(emailVal, profile);
                    alert('Signup successful! You can now log in.');
                    window.location.href = '/login.html';
                })
                .catch(function(err) {
                    alert(err.message || 'Signup failed');
                });
        });
    }

    // LOGIN PAGE
    function bindLogin() {
        var form = document.querySelector('.login-form');
        if (!form) return;

        on(form, 'submit', function(e) {
            e.preventDefault();
            var emailInput = form.querySelector('input[type="email"]');
            var passwordInput = form.querySelector('input[type="password"]');
            var emailVal = emailInput && emailInput.value.trim();
            var passwordVal = passwordInput && passwordInput.value.trim();
            if (!emailVal || !passwordVal) return;

            firebaseAuth.signInWithEmailAndPassword(emailVal, passwordVal)
                .then(function(cred) {
                    var profile = readUserProfileFromLocal(emailVal) || { uid: cred.user.uid, email: emailVal, username: '' };
                    localStorage.setItem('currentUser', JSON.stringify(profile));
                    alert('Login successful!');
                    window.location.href = '/Dashboard.html';
                })
                .catch(function(err) {
                    alert(err.message || 'Login failed');
                });
        });
    }

    // AUTO-BIND
    document.addEventListener('DOMContentLoaded', function() {
        bindSignup();
        bindLogin();
    });
})();


