<template>
    <div class="user" v-if="user">
        <div class="user__column">
            <span>Name</span>
            <p>{{ user.username }}</p>
        </div>
        <div class="user__column">
            <span>Block</span>
            <div 
                :class="['radar', {'radar--on': user.block}]"
                @click="blockUser([user.username, user.block])"
                v-if="!isAdmin"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UserItem',
    props: {
        user: {
            type: Object,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions({
            blockUser: 'admin/blockUser'
        })
    },
}
</script>
  
<style scoped lang="sass">
.user
    display: flex
    grid-gap: 10px
    width: 100%
    max-width: 700px
    background: $purple
    padding: 15px
    border-radius: 15px
    color: $white

    &__column
        width: 50%
        border-right: 2px solid $blue
        display: flex
        flex-direction: column
        grid-gap: 10px

        &:last-child
            border: none

        & span
            font-size: 12px
            color: rgba($white, .7)

        & p
            font-weight: 600

        .radar
            width: 15px
            height: 15px
            background: $green
            border-radius: 50%
            cursor: pointer

            &--on
                background: $orange
</style>  