import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";
@Component({
  selector: 'app-quizz',
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title:string = "";

  questoes:any;
  questaoSelecionada:any;

  respostas:string[] = [];
  respostaSelecionada:string ="";

  questaoIndex:number = 0;
  questaoMaxIndex:number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished  = false
      this.title = quizz_questions.title

      this.questoes = quizz_questions.questions
      this.questaoSelecionada = this.questoes[this.questaoIndex]

      this.questaoIndex = 0
      this.questaoMaxIndex = this.questoes.length

      console.log(this.questaoIndex)
      console.log(this.questaoMaxIndex)
    }
  }

  questaoEscolhida(value:string){
    this.respostas.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questaoIndex+=1

    if(this.questaoMaxIndex > this.questaoIndex){
        this.questaoSelecionada = this.questoes[this.questaoIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.respostas)
      this.finished = true
      this.respostaSelecionada = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(respostas:string[]){

    const result = respostas.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
