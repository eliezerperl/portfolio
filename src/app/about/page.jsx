import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/components/Button/Button'

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        fill={true} alt='' className={styles.img}/>
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Storytellers</h1>
          <h2 className={styles.imgDesc}>Handcrafting award winning digital expeiriences</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who are we?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat, magnam eius enim similique, vel ab consequatur amet inventore hic voluptate dicta quasi officia et atque dolore. Iusto natus aut tenetur facilis, distinctio, eius autem a hic blanditiis cumque velit. Debitis quam eaque maiores perspiciatis non excepturi reprehenderit placeat fugit inventore adipisci quas, ea laudantium officia. Et itaque quas ad eius eligendi, quis placeat dolor sequi omnis nemo ex id a rem nulla dolore saepe. Ipsum dolores officia suscipit quos explicabo. Nobis commodi aperiam quia impedit qui dolore assumenda modi facere molestiae, ut autem repudiandae praesentium totam unde possimus quos? Esse illum quibusdam impedit reprehenderit, illo perspiciatis magni fugit dolore est in harum blanditiis, expedita, minima alias. Quidem, corrupti doloremque facere minima iste aspernatur, inventore hic maiores sit velit tempora veritatis quos adipisci autem totam voluptates, fuga animi. Temporibus deleniti rerum omnis sapiente dicta, qui cum excepturi tempore neque blanditiis.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What do we do?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, voluptatem temporibus voluptas qui magni iste inventore ab dolor distinctio harum eos suscipit repellat hic nemo numquam, facilis architecto tempore voluptatibus facere! Possimus cum quam non ea officiis praesentium doloremque necessitatibus blanditiis, porro dolorem, dolore, autem eius odio aperiam repellendus odit cupiditate ullam iste. Fuga voluptas perspiciatis aliquid hic nisi alias placeat deserunt quisquam nobis, sed dolorem velit corporis beatae esse voluptatum distinctio, obcaecati quaerat nulla? Maiores voluptatibus labore vero id! Molestiae corrupti debitis reiciendis maiores aut harum animi aperiam vero illum exercitationem nam laudantium laborum, impedit consectetur optio, obcaecati minus blanditiis repellendus? Sint quibusdam alias esse doloremque, fuga, quis eius dignissimos in pariatur non, obcaecati facere unde minus magni. Tenetur consectetur amet fuga, dolore soluta, dicta commodi tempora quae sed, nesciunt animi error rerum non vel eius voluptatum aliquam neque quaerat porro? Aliquam consectetur eum illo non rerum, sint temporibus.
          </p>
          <Button url="/contact" text="Contact"/>
        </div>
      </div>
    </div>
  )
}

export default About