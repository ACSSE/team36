package oasys.za.ac.uj.team36.Model;

import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * Created by Nick on 2016-08-15.
 */
@SuppressWarnings("deprecation")
public class JsonParser {

    private static InputStream IS ;
    private static JSONObject JB ;
    private static String json = "" ;

    public JsonParser() {

    }

    public JSONObject httprequest(String URL , String method, ArrayList<NameValuePair> params){
        try {
            switch (method) {
                case "POST" :

                    DefaultHttpClient client = new DefaultHttpClient() ;
                    HttpPost post = new HttpPost(URL);
                    post.setEntity(new UrlEncodedFormEntity(params));


                    break ;
                case "GET" :

                    DefaultHttpClient client2 = new DefaultHttpClient() ;
                    String paramString = URLEncodedUtils.format(params,"utf-8") ;
                    URL += "?" + paramString ;
                    HttpGet get = new HttpGet(URL) ;

                    HttpResponse response = client2.execute(get);
                    HttpEntity entity = response.getEntity();
                    IS = entity.getContent() ;

                    break ;

            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }

        try{
            BufferedReader reader = new BufferedReader(new InputStreamReader(IS),8);
            StringBuilder SB = new StringBuilder() ;
            String Line = "";
            while((Line = reader.readLine()) != null){
                SB.append(Line + "\n") ;
            }
            IS.close();
            json = SB.toString() ;

        }catch (Exception e){
            Log.e("Buffer error","Conersoin error: " + e.toString());
            e.printStackTrace();
        }

        try
        {
            JB = new JSONObject(json);
        }catch (Exception e)
        {
            e.printStackTrace();
            Log.e("JSON parser",e.toString()) ;
        }

        return JB ;
    }




}
