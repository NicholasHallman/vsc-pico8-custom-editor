import {css} from 'https://unpkg.com/fuco?module';

export default css`   
.center-full{
    width: min(100vh, 100vw);
    height: min(100vh, 100vw);
    margin: auto auto;
}

h1 {
    color: white;
}

.topbar {
    height: 6.25%;
    width: 100%;
    background-color: var(--red);
}

.viewContainer {
    position: relative;
    width: calc(100% - 80px);
    height: calc(calc(100vh - 14%) - calc(calc(min(100vh, 100vw) / 16) * 4));
    margin: 0 auto;
    padding: 0 40px;
    justify-content: space-between;
    padding-top: 10px;
    display: flex;
    background-color: var(--dark-grey);
}

.sprites {
    position: relative;
    background-color: black;
    width: 100%;
    height: calc(calc(min(100vh, 100vw) / 16) * 4);
}

.spriteContainer {
    width: 100%;
    height: 100%;
}
.spriteContainer.highlighter {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
}

.sprite {
    height: calc(100% / 4);
    width: calc(100% / 16);
    user-select: none;
}

.sprite.selected {
    box-shadow: 0px 0px 0px 5px white;
}

.spriteView {
    width: min(50vw, 50vh);
    height: min(50vw, 50vh); 
    background-color: black;
}

.colorView {
    width: calc(40vh - 80px);
    height: calc(40vh - 80px); 
    background-color: black;
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
}

.color{
    background-color: white;
    width: calc(100% / 4);
    height: calc(100% / 4);
}

.color.selected {
    box-shadow: 0px 0px 0px 5px white;
    z-index: 2;
}

.page-tab {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    align-items: flex-end;
}

.tab {
    font-family: Pico8;
    padding: 5px 5px 5px 10px;
    font-size: 20px;
    background-color: var(--grey);
    color: var(--indigo);
    height: 22px;
    margin-right: 5px;
}

.tab.selected {
    background-color: var(--white);
    border-bottom: 5px solid var(--pink);
    color: var(--pink);
}

.sprite-number {
    font-family: Pico8;
    background-color: var(--grey);
    color: var(--indigo);
    padding: 5px 5px 5px 10px;
    height: 22px;
    width: 50px;
    margin-right: 5px;
    font-size: 20px;
    margin-bottom: 5px;
}

.black {
    background-color: var(--black);
}

.darkblue {
    background-color: var(--dark-blue);
}

.purple {
    background-color: var(--purple);
}

.darkgreen {
    background-color: var(--dark-green);
}

.brown {
    background-color: var(--brown);
}

.darkgrey {
    background-color: var(--dark-grey);
}

.grey {
    background-color: var(--grey);
}

.white {
    background-color: var(--white);
}

.red {
    background-color: var(--red);
}

.orange {
    background-color: var(--orange);
}

.yellow {
    background-color: var(--yellow);
}

.green {
    background-color: var(--green);
}

.blue {
    background-color: var(--blue);
}

.indigo {
    background-color: var(--indigo);
}

.pink {
    background-color: var(--pink);
}

.peach {
    background-color: var(--peach);
}
`