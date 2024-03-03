<template>
    <div class="hint">
        <p>{{ data }}</p>
    </div>
</template>
  
<script>
export default {
    name: 'Hint',

    props: {
        data: {
            type: String,
            default: 'Empty Hint'
        }
    }
}
</script>

<style scoped lang="sass">
.hint
    position: fixed
    top: 100px
    right: 20px
    max-width: 350px
    background: $blue
    color: $primary
    padding: 15px
    animation-name: hint
    animation-duration: 3s
    animation-fill-mode: forwards
    transform: translateX(150%)

    @keyframes hint
        10%
            transform: translateX(0)
        90%    
            transform: translateX(0)
        100%
            transform: translateX(150%)

    &::after
        content: ''
        display: block
        position: absolute
        top: 0
        right: 0
        width: 5px
        height: 100%
        background: $purple

    & p
        font-size: clamp(12px, 1vw, 16px)
        line-height: 1.5
        font-weight: 600
        
</style>
  