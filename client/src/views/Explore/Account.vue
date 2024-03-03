<template>
    <div class="account">
        <button class="account__logout" @click="logout">Выйти</button>
        <div class="account__inner">
            <div class="reset-password">
                <form @submit.prevent="validateChangePass" class="form-line">
                    <input 
                        type="password" 
                        name="oldPawword" 
                        placeholder="Старый пароль" 
                        v-model="userData.oldPassword" 
                        class="large"
                    />
                    <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="Новый пароль" 
                        v-model="userData.newPassword"
                        required
                    />
                    <input 
                        type="password" 
                        name="newPasswordRepeat" 
                        placeholder="Повторите пароль" 
                        v-model="userData.repeatPassword"
                        required
                    />
                    <button type="submit">Сменить</button>
                </form>
            </div>
            <section class="admin-panel" v-if="getIsAdmin">
                <form @submit.prevent="addUser(newUser)" class="form-line">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Имя нового пользователя" 
                        required
                        v-model="newUser.username" 
                    />
                    <button type="submit">Добавить</button>
                </form>
                <div class="admin-panel__users" v-if="allUsers">
                    <UserItem 
                        v-for="user in allUsers" 
                        :key="user.username"
                        :user="user"
                        :isAdmin="user.username == 'ADMIN'"
                    />
                </div>
                <h2 v-else>Загружаем пользователей..</h2>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserItem from '@/components/UserItem.vue'
import Cookies from 'js-cookie';

export default {
    components: {
        UserItem
    },

    data() {
        return {
            newUser: {
                username: ''
            },
            userData: {
                oldPassword: '',
                newPassword: '',
                repeatPassword: ''
            },
            isAdmin: false
        }
    },

    async mounted() {
        let isAdminCookie = Cookies.get('account') ? await JSON.parse(Cookies.get('account')).username === 'ADMIN' : false;

        this.isAdmin = isAdminCookie;

        if (isAdminCookie)
            this.fetchAllUsers();
    },

    methods: {
        ...mapActions({
            fetchAllUsers: 'admin/fetchAllUsers',
            addUser: 'admin/addUser',
            logout: 'auth/logout',
            changePassword: 'users/changePassword',
            setHint: 'setNewHint'
        }),

        validateChangePass() {
            if (this.userData.newPassword === this.userData.repeatPassword)
                this.changePassword(this.userData);
            else {
                // alert('Пароли не совпадают');
                this.setHint('Пароли не совпадают');
            }
        }
    },

    computed: {
        ...mapGetters({
            allUsers: 'admin/getAllUsers',
        }),

        getIsAdmin() {
            return this.isAdmin;
        }
    }
}
</script>
  
<style scoped lang="sass">
.account
    &__logout
        position: fixed
        top: 30px
        right: 30px

        background: $peach
        padding: 15px 25px
        border-radius: 15px
        color: $white
        font-size: 16px
        font-weight: 600
        cursor: pointer
        transition: $trs

        &:hover
            background: $orange

    &__inner
        min-height: 100vh
        max-width: 700px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        grid-gap: 80px
        margin: 0 auto

.admin-panel
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    grid-gap: 80px
    width: 100%

    &__users
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        grid-gap: 15px

.reset-password
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    grid-gap: 15px

.form-line
    display: flex
    flex-wrap: wrap
    grid-gap: 20px
    width: 100%

    & input
        padding: 15px
        background: $purple
        color: $white
        font-size: 16px
        border-radius: 15px
        flex-grow: 1
        font-weight: 600
        &.large
            width: 100%

        &::placeholder
            color: $white
            opacity: .7

    & button
        background: $blue
        padding: 15px 25px
        border-radius: 15px
        color: $white
        font-size: 16px
        font-weight: 600
        cursor: pointer
        transition: $trs

        &:hover
            background: $light-blue
            color: $primary
</style>  