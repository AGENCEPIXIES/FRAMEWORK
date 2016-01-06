<?php 
get_header(); ?>

<div class="container-fluid header-single text-center">
	<h1><?php single_cat_title(); ?></h1>
</div>

	<div class="container">

			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				<article class="row">
					<div class="col-md-5">
						<a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php if ( has_post_thumbnail() ) {
					        the_post_thumbnail(  'archive' );
					        /*$url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'news-home' ); ?>*/
					    }  ?></a>
					</div>
					<div class="col-md-7">
						<div class="meta"><?php the_date(); ?> - <?php $categories = get_the_category(); $separator = ', '; $output = '';
		                    if ( ! empty( $categories ) ) {
		                        foreach( $categories as $category ) {
		                            $output .= '<a class="cat-article" href="' . esc_url( get_category_link( $category->term_id ) ) . '" alt="' . esc_attr( sprintf( __( 'View all posts in %s', 'textdomain' ), $category->name ) ) . '">' . esc_html( $category->name ) . '</a>' . $separator;
		                        }
		                        echo trim( $output, $separator );
		                    } ?>
                		</div>
						<h2><a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<?php the_excerpt(); ?>
						<a class="more" title="<?php the_title(); ?>" href="<?php the_permalink(); ?>">Lire la suite</a>
					</div>
					
				</article>
				<hr>
			<?php endwhile; else: ?>
			    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
			<?php endif; ?>
       

	</div>
	<div class="container main-content" style="margin-bottom:30px;">
          <?php wp_pagenavi(); ?>
    </div>


<?php get_footer(); ?>