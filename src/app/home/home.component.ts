import { Component, ElementRef, OnInit, Renderer2, ViewChild,} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('parent') parent?: ElementRef;

  constructor(private el:ElementRef, private render: Renderer2) { }

  ngAfterViewInit(): void {
    const images = this.el.nativeElement.querySelectorAll('#images');
    images.forEach((img:any) => {
    img.addEventListener('click',(src:any) => {
    this.getNode(src.target)
      })
    })
  }

  ngOnInit(): void {
    this.initialScroll();
  }

  getNode(value:any) {
    const modal =this.render.createElement('div');
    this.parent?.nativeElement.prepend(modal);
    const newEl = this.render.createElement('div');
    this.render.appendChild(modal, newEl);
    modal.style.cssText =`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.563);
    z-index: 100;
    width: 100vw;
    height: 100vh;
    `;
    newEl.style.cssText = `
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    `;
    newEl.innerHTML = `<img src="${value.src}" style=" max-width:60%; max-height:90%;">`;
    modal?.addEventListener('click', () => modal.remove());
  }

  initialScroll(): void {
    const hero = this.el.nativeElement.querySelector('.hero-section');
    const itemsLeft = this.el.nativeElement.querySelectorAll('.gallery__left .gallery__item');
    const itemsRight = this.el.nativeElement.querySelectorAll('.gallery__right .gallery__item');

    gsap.fromTo(hero, {opacity : 1}, {
      opacity: 0,
      scrollTrigger:{
        trigger:hero,
        start:'center',
        end:'620',
        scrub: true
      }
    });

    itemsLeft.forEach((item:any) => {
      gsap.fromTo(item, { opacity: 0, x: -100 }, {
        opacity: 1, x: 0,
        scrollTrigger: {
          trigger: item,
          start: '-800',
          end: '-100',
          scrub: true
        }
      })
    })

    itemsRight.forEach((item:any)=> {
      gsap.fromTo(item, { opacity: 0, x: 100 }, {
        opacity: 1, x: 0,
        scrollTrigger: {
          trigger: item,
          start: '-750',
          end: 'top',
          scrub: true
        }
      })
    })

  }

}
