package oasys.za.ac.uj.team36.tests;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.LinearLayout;

/**
 * Created by Nick on 2016-07-16.
 */
public class SlideContainer extends LinearLayout {

        private View menu ;
        private View content;

        public static final int MARGIN = 120 ;
        private int currentOffset  = 0 ;

        public enum State{ClOSED, OPEN};

        public State currentStat = State.ClOSED ;
        public SlideContainer(Context context, AttributeSet atts, int style)
        {
            super(context, atts, style);
        }


        @Override
        protected void onAttachedToWindow(){
            super.onAttachedToWindow();
            this.menu = this.getChildAt(0) ;
            this.content = this.getChildAt(1) ;
            this.menu.setVisibility(View.GONE);
        }

        @Override
        protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
            if(changed) {
                this.calculateChildDimensions() ;
                this.menu.layout(left,top,right - MARGIN ,bottom);
                this.content.layout(left + this.currentOffset,top,right + this.currentOffset,bottom);
            }
        }

        protected void toggleMenu() {
            switch (this.currentStat) {
                case ClOSED:
                    //shift menu to the right and content to the right
                    this.menu.setVisibility(View.VISIBLE);
                    this.currentOffset = this.getMenuWidth();
                    this.content.offsetLeftAndRight(currentOffset);
                    this.currentStat = State.OPEN ;
                    break ;
                case OPEN:
                    // shift content back to the left
                    this.content.offsetLeftAndRight(-currentOffset);
                    this.currentOffset = 0 ;
                    this.currentStat = State.ClOSED ;
                    this.menu.setVisibility(View.GONE);
                    break ;
            }
            this.invalidate();
        }

        private int getMenuWidth()
        {
            return this.menu.getLayoutParams().width ;
        }
        private void calculateChildDimensions()
        {
            this.content.getLayoutParams().height = this.getHeight() ;
            this.content.getLayoutParams().width = this.getWidth() ;

            this.menu.getLayoutParams().width = this.getWidth() - MARGIN ;
            this.menu.getLayoutParams().height = this.getHeight();
        }


}
