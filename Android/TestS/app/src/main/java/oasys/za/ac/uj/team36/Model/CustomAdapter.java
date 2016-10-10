package oasys.za.ac.uj.team36.Model;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.toolbox.ImageLoader;

import java.util.zip.Inflater;

import oasys.za.ac.uj.team36.tests.R;

/**
 * Created by Nick on 2016-10-05.
 */
public class CustomAdapter extends ArrayAdapter<String> {
    private final Activity context;
    // item name being the job title (the date/worktype)
    private final String[] itemname;
    // item description being the description of item
    //private final String[] itemDescrip;
    // imgid being the image id resource from the drawable folder
    private final Integer[] imgid;

    public CustomAdapter(Activity context, String[] itemname, Integer[] imgid// ,String[] itemDesc
    ) {
        super(context, R.layout.image_text_list_item, itemname);
        // TODO Auto-generated constructor stub
        //this.itemDescrip = itemDesc ;
        this.context=context;
        this.itemname=itemname;
        this.imgid=imgid;
    }

    public View getView(int position,View view,ViewGroup parent) {
        LayoutInflater inflater=context.getLayoutInflater();
        View rowView=inflater.inflate(R.layout.image_text_list_item, null,true);

        TextView txtTitle = (TextView) rowView.findViewById(R.id.label);
        ImageView imageView = (ImageView) rowView.findViewById(R.id.iconJob);
        //TextView txtdescrip = (TextView) rowView.findViewById(R.id.labelDescript) ;
        //txtdescrip.setText(itemDescrip[position]);
        txtTitle.setText(itemname[position]);
        imageView.setImageResource(imgid[position]);
        return rowView;

    }
}

