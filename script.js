const gameBoard = (() => {
    const gbArr = [];

    const gameLogic = () => {

        if(gbArr[0] === gbArr[1] && gbArr[1] === gbArr[2] && gbArr[0] === "x" || 
        gbArr[6] === gbArr[7] && gbArr[7] === gbArr[8] && gbArr[6] === "x" || 
        gbArr[3] === gbArr[4] && gbArr[4] === gbArr[5] && gbArr[3] === "x" ||
        gbArr[0] === gbArr[3] && gbArr[3] === gbArr[6] && gbArr[0] === "x" ||
        gbArr[1] === gbArr[4] && gbArr[4] === gbArr[7] && gbArr[1] === "x" || 
        gbArr[2] === gbArr[5] && gbArr[5] === gbArr[8] && gbArr[2] === "x" ||
        gbArr[0] === gbArr[4] && gbArr[4] === gbArr[8] && gbArr[0] === "x" || 
        gbArr[2] === gbArr[4] && gbArr[4] === gbArr[6] && gbArr[0] === "x"){   
            console.log("X WIN");
            if(getName().playerX !== ""){
                displayController.displayBoard(getName().playerX + " won");
            }
            else{
            displayController.displayBoard("X won");
            }
        }

        else if( gbArr[0] === gbArr[1] && gbArr[1] === gbArr[2] && gbArr[0] === "o" || 
            gbArr[6] === gbArr[7] && gbArr[7] === gbArr[8] && gbArr[6] === "o" || 
            gbArr[3] === gbArr[4] && gbArr[4] === gbArr[5] && gbArr[3] === "o" ||
            gbArr[0] === gbArr[3] && gbArr[3] === gbArr[6] && gbArr[0] === "o" ||
            gbArr[1] === gbArr[4] && gbArr[4] === gbArr[7] && gbArr[1] === "o" || 
            gbArr[2] === gbArr[5] && gbArr[5] === gbArr[8] && gbArr[2] === "o" ||
            gbArr[0] === gbArr[4] && gbArr[4] === gbArr[8] && gbArr[0] === "o" || 
            gbArr[2] === gbArr[4] && gbArr[4] === gbArr[6] && gbArr[0] === "o"){ 
            console.log("O WINS");
            if(getName().playerX !== ""){
                displayController.displayBoard(getName().playerO + " won");
            }
            else{
            displayController.displayBoard("O won");
            }
        }

        else {
            let strCount = 0;
            for(i=0;i<9;i++){
                if(typeof(gbArr[i]) === "string"){
                    strCount++;
                }
            }
            if(strCount == 9){
            displayController.displayBoard("Draw")
            }
        }

    }

    const addToArr = (index,input) => {
        gbArr[index] = input;
        if(gbArr.length >= 5){gameLogic()}
        console.log(gbArr)
    }

    const reset = () => {
        gbArr.length = 0;
    }

    return {addToArr, gameLogic,reset}
})();

const displayController = (() => {
    const container = document.querySelector('#container');

    let select = 0;

    const inputSelect = () => {

        if(select === 0){
            select++;
            return "x"
        }
        else{
            select--;
            return "o"
        }
    }



    const display = () => {
        for(i=0;i<9;i++){
            const div = document.createElement('div');
            div.style.backgroundImage = "url('https://images.unsplash.com/photo-1601662528567-526cd06f6582?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80')";
            div.style.color = "blue"
            let a = i;
            div.classList.add('pad')
            let count = 0;
            div.addEventListener('click',() => {
                count ++;
                console.log(count)
                if(count == 1){
                let input = inputSelect()
                gameBoard.addToArr(a,input)
                div.textContent = input;
                }
            })
            const reset = document.querySelector('#reset');
            
            reset.addEventListener('click',() => {
                div.textContent = "";
                gameBoard.reset();
                count = 0;
                select = 0;
            })

            div.classList.add("display");
            container.appendChild(div);
                
        }
    }   
    const winScreen = document.querySelector('#winScreen');
    const displayBoard = (text) => {

        const dispText = document.createElement('p');
        dispText.textContent = text;
        
        winScreen.insertBefore(dispText,winScreen.childNodes[0])
        
        if(winScreen.contains(dispText)){
        document.getElementById('reset').addEventListener('click',() => {
        winScreen.removeChild(dispText)
        })
    }
    }

    return {display,displayBoard}
})();

const player  = (name) => {
    const playerName = name;

    return playerName;
}

const getName = () => {
    
    const playerX = player(document.querySelector('#inpX').value)
    const playerO = player(document.querySelector('#inpO').value)

    return {playerX,playerO}
}

displayController.display()