import {css} from 'https://unpkg.com/fuco?module';

export default css`   
.center-full{
    width: min(100vh, 100vw);
    height: min(100vh, 100vw);
    overflow: hidden;
}

h1 {
    color: white;
}

.topbar {
    height: 6.25%;
    width: 100%;
    background-color: var(--red);
}

.bottombar{
    height: calc(calc(calc(calc(min(100vh, 100vw) - 6.25%) - calc((min(100vh, 100vw) - 14%) - ((min(100vh, 100vw) / 16) * 4))) - calc((min(100vh, 100vw) / 16) * 4)) - 10px);
    width: 100%;
    background-color: var(--red);
}

.viewContainer {
    position: relative;
    width: calc(100% - 80px);
    height: calc(calc(min(100vh, 100vw) - 14%) - calc(calc(min(100vh, 100vw) / 16) * 4));
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
    width: calc(min(40vh, 40vw) - 80px);
    height: calc(min(40vh, 40vw) - 80px); 
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
    padding: min(1vh, 1vw);
    padding-left: min(2vh, 2vw);
    font-size: min(3.5vw, 3.5vh);
    background-color: var(--grey);
    color: var(--indigo);
    height: min(4vh, 4vw);
    margin-right: 5px;
}

.tab.selected {
    background-color: var(--white);
    border-bottom: 5px solid var(--pink);
    color: var(--pink);
}

.tool-bar {
    display: flex;
    position: absolute;
    bottom: 10px;
    align-items: flex-end;
    width: min(50vw, 50vh);
}

.tool-bar > img {
    cursor: pointer;
    opacity: 0.5;
    margin-right: 10px;
    height: 35px;
    object-fit: contain;
    width: calc(calc(min(50vw, 50vh) / 6) - 8px)
}

.tool-bar > img.selected {
    opacity: 1;
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