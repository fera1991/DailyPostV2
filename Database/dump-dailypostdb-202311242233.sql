PGDMP         !            
    {            dailypostdb    15.4    15.3 !    w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            z           1262    16389    dailypostdb    DATABASE     v   CREATE DATABASE dailypostdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE dailypostdb;
                fera    false            {           0    0    dailypostdb    DATABASE PROPERTIES     4   ALTER DATABASE dailypostdb SET "TimeZone" TO 'utc';
                     fera    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                fera    false            |           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   fera    false    5            �            1259    16443    comments    TABLE     �   CREATE TABLE public.comments (
    id_comment uuid DEFAULT gen_random_uuid() NOT NULL,
    id_post uuid NOT NULL,
    text character varying NOT NULL,
    id_user uuid NOT NULL
);
    DROP TABLE public.comments;
       public         heap    fera    false    5            �            1259    16412 	   favorites    TABLE     �   CREATE TABLE public.favorites (
    id_favorite uuid DEFAULT gen_random_uuid() NOT NULL,
    id_post uuid NOT NULL,
    id_user uuid NOT NULL,
    created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.favorites;
       public         heap    fera    false    5            �            1259    16407    likes    TABLE     �   CREATE TABLE public.likes (
    id_like uuid DEFAULT gen_random_uuid() NOT NULL,
    id_post uuid NOT NULL,
    id_user uuid NOT NULL
);
    DROP TABLE public.likes;
       public         heap    fera    false    5            �            1259    16400    posts    TABLE     K  CREATE TABLE public.posts (
    id_post uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    image character varying NOT NULL,
    description character varying NOT NULL,
    is_archived boolean DEFAULT false NOT NULL,
    id_user uuid NOT NULL,
    created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.posts;
       public         heap    fera    false    5            �            1259    16512    token    TABLE     �   CREATE TABLE public.token (
    code uuid DEFAULT gen_random_uuid() NOT NULL,
    content character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_code uuid
);
    DROP TABLE public.token;
       public         heap    fera    false    5            �            1259    16394    users    TABLE     �   CREATE TABLE public.users (
    id_user uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    active boolean DEFAULT true NOT NULL
);
    DROP TABLE public.users;
       public         heap    fera    false    5            s          0    16443    comments 
   TABLE DATA           F   COPY public.comments (id_comment, id_post, text, id_user) FROM stdin;
    public          fera    false    218   �%       r          0    16412 	   favorites 
   TABLE DATA           N   COPY public.favorites (id_favorite, id_post, id_user, created_at) FROM stdin;
    public          fera    false    217   �'       q          0    16407    likes 
   TABLE DATA           :   COPY public.likes (id_like, id_post, id_user) FROM stdin;
    public          fera    false    216   -+       p          0    16400    posts 
   TABLE DATA           e   COPY public.posts (id_post, title, image, description, is_archived, id_user, created_at) FROM stdin;
    public          fera    false    215   ..       t          0    16512    token 
   TABLE DATA           N   COPY public.token (code, content, active, "timestamp", user_code) FROM stdin;
    public          fera    false    219   �5       o          0    16394    users 
   TABLE DATA           K   COPY public.users (id_user, username, email, password, active) FROM stdin;
    public          fera    false    214   4c       �           2606    16452    comments comments_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pk PRIMARY KEY (id_comment);
 >   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pk;
       public            fera    false    218            �           2606    16454    favorites favorites_pk 
   CONSTRAINT     ]   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pk PRIMARY KEY (id_favorite);
 @   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pk;
       public            fera    false    217            �           2606    16456    likes likes_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pk PRIMARY KEY (id_like);
 8   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pk;
       public            fera    false    216            �           2606    16458    posts posts_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id_post);
 8   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pk;
       public            fera    false    215            �           2606    16521    token token_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pk PRIMARY KEY (code);
 8   ALTER TABLE ONLY public.token DROP CONSTRAINT token_pk;
       public            fera    false    219            �           2606    16460    users users_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id_user);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            fera    false    214            �           2606    16491    comments comments_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk FOREIGN KEY (id_post) REFERENCES public.posts(id_post) ON UPDATE CASCADE;
 >   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_fk;
       public          fera    false    3024    215    218            �           2606    16496    comments comments_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk_1 FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE;
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_fk_1;
       public          fera    false    214    3022    218            �           2606    16466    favorites favorites_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_fk FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE;
 @   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_fk;
       public          fera    false    217    214    3022            �           2606    16471    favorites favorites_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_fk_1 FOREIGN KEY (id_post) REFERENCES public.posts(id_post) ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_fk_1;
       public          fera    false    217    3024    215            �           2606    16476    likes likes_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE;
 8   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_fk;
       public          fera    false    216    214    3022            �           2606    16481    likes likes_fk_1    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk_1 FOREIGN KEY (id_post) REFERENCES public.posts(id_post) ON UPDATE CASCADE;
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_fk_1;
       public          fera    false    215    3024    216            �           2606    16486    posts posts_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 8   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_fk;
       public          fera    false    214    215    3022            �           2606    16522    token token_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_fk FOREIGN KEY (user_code) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 8   ALTER TABLE ONLY public.token DROP CONSTRAINT token_fk;
       public          fera    false    214    3022    219            s   N  x���1�7��y�x` ��(�FJ�RHCR$���c���$)�$Wȹ|�pS�`5�~~?ə3��^HT�`"�r�q�m���T��Ì��(T;�߿����šZ��|E�L��Z>�0J�Z*-����Zi�B��B�;L��q�V�/��e�/w�:���g9;�)C��d��'�O[ܧb�|����ڀ�I�Akf.L��bqlޫz��4�5�9]R!_�x�=O�p�y����$���%�v�˂�
ߢm�n�҄#���ڵ����
������+�ub���f�(����+:�����l��]�&/OG#�������_����3D��t���+��Ap-�!4��^_�}>�5M��xӄ���x��#�qgw�u��&��9�f�*�6bg�����q�|������?~���yo�����&&Ѝ�����3R���a�j�baTJp�Yi]l*U�Mq����k�{�ᖬ4K�KM���3�5Ԗ�jz�*#�$�@)�@5k�V7��Lݙ��rQ2��Dy�-צ�6���w?���/�ۼЫ�|/��O���8���n��5N����o?�n� �mv      r   %  x��U;��:��U��x-/����Dw���ZF����Î��.�����I-G�iqmݎg;��ց�����|<�_��{[�SU�0�l0�S�r�h5�$Z{5�O"'�\!��q�k����r�X����#	b� �y�����|�`�f^�07�v��m�@d�����~S[��wi�`4�`QН�t��}^����}�SuC��S18r�o�WD�#1!�u`"�j��gKǆ�k��џ^��ǉn�3�C�)E��T6��X8&ӡ�4��
����VV�G�y����ʓ4�*�ZU�%���Y�ŧ�_0D�C�K1
A��⻮��	aEb�8{�߉�%���m�do<0��e�$ؑk*���/-��4��wOq5�tJv���d���=��KN#Z���)�'*!�͞�����UckY�zdUe�Ѳ�?�����?`�C�p%E�ʶItֿ<5�g��Ɗ�Je&�K��2�Ƽ@rp/ٖ֡�|{����Ʃ�2'�X'�C���������� [��kr�^}�,�� 9k���/a��g7�&L^�*�T�yHuH,��wI��|J��{dF2z��c��bp����L߿Kʗ0�3J�2������e&�%C�9b�J���Ʉ�uh�K*Q]������4yP���޲N����|�yeqEu�������ù�8u��
�"�>�3v�F����I]i/���,(����V�Zi�˹��w|�ȍ������.�+У��eZ\�V��S�2�ǫ6��a����v�����`��v�����P��8      q   �  x���A� D��0O�2Q���2'Ȣ�b ?U��=|蠭�$�&��F��מq3��UlbaڑdՋ�K�&<��'�YN�k�z���iT+�������һ�6���� �-1�\��n��Un�G���X���~J���.k�X�4[#��)�PX�����1�Q�3���~��U6��C��[;���]@`F�z�e��^�<��B�����$�=6#���3�;d�S�$i���������KC]���βQ�2y��붩���5,.��EDI�oy��m����mwKS�`�Ҁ
ڹ��)��i1����w �4fa!�tv����(?w��h��]{���j�S��R�n���'���O�r�kM|����S���js	aaFᤔJ�eq��ՙ�k)T�؍�#�m�j����:�uJ�Nbw�4|KlI/����4,À`n����c�wD���]���}`v�4��ۑH�]��7� ��Z^�Eq֤� �i�����*���vHy ��������R�����u ��	e���j��w��(pۛ��
��}5���Go{��X7qz��f_u�[���펅��`n�����]dG�v���%ܬ+-��p�3R/��1�ʜ�U^� E�D4�]�6�9�]�S-�k8�r��Y��qϙ���
���C��5D���5fC�}���ݬ��SsCt��V�� �����&�����K\n�%c#����������M���      p   �  x��Wˎ[�]�_q��*�����(�+p��d�MUw��c���%�H��#��ev��r.G�#1"�� p0Ct�V�:U�Tj�Q,Y��Dy�r,V{�;���ǳ0O�B��I=�i�yCu3�/N�ô���#�L2��#���~�B�ʹ����F����8�Tr���a<]�w��(18�{-�;���T�M�Ts�,�W�=}����_�Ưe����DQ�|�%]%�o��뵕��/�u����e<�Z��uV��{1��R��j�1��A����V�ťs�����L,*w��HF{���X_lN4|%�]�0r�e�E���Ҋ�%Ze�f�{)�
�fs!����<�-A�,�W��Nw��l;l�^����qx�'x/�-��㮼��8�L�Vj�l(�����.,��X;S�ʷ��U	!'ۥ�����v��q���7��!dB]��H)�>�
�g����j���_s�zWb��Rȸd��,�ِm�"����qh�&��q�r�6�;��t�#�L�6;���8�ʴ9�<c�ĕ�ꉍ�6E-'%��2;~���kW)إ�&��H�L^�@cP�}A>9�e���w��Ɓ;�q8��#������t���v��jr+y3���#���;���%�-�2��Etg̀��a�&11�i�����72�3��8;y���(�|���롎�	�N�aF�?�H�h��������I��~�?�xE.'�x��'���^�Q>Y�>���`�څ�ͫ�l0:ۤ��|5��A��̘HƲ+f�t��R�-/7�nH�X�q��f(fĬ�d��q�I.ܹ\Q5�X�W��v��CЪF�4�������~h��.�F�x����@�9������+�a�MX��������j� �,Z�IFvAb�!q�Y*���C5�BD[ֺ��1K�{7M�I���*{_U��;����ޞg2F�9�O�u�J���,�D�����P�W4�crS��β�ᤲMt�����V��~#�+�~��g_<��gϾz|}�쀛~m#�c2/�OمnU��g���pz��T����R��KP(�6��5%�ޫ�ME#�V���,ͅv�ar]D��8̗*������֖s�����v�EH\Z;��,'�LPgI�F���w%)W�3y)���wO�?�������iJLDS��YQU��kC!uW�86��P������Q���*%���=�]��ø���ǠS�.�Ӳɾ+"� a*&#J|�)�d�<ڼ��75yR��sȨ�8
Fϣ4�t��\�+�Wq�f���9Q�*��:Wf�˸�ha��������ã��������o����s}6��]���:1�*M3h^#�	~*7g-֍��I?mN��xC �hrUW��v�쯴j�5�.�8������j�vE؀�+�i����"���9�]'�O��&.9��%�9k�L�)����攞�
~��]��F0^0bb1iV��TT.��P���t�T)���6<d6n��VXpt���7/ƹ�t�y��;��Q�b�u1�"t߷��1�aJe����L����B]�?�����q�!�g�C��tC�0E<:c�̫ ���A��W�/T�zG% V�}¶UJ�*�e��y�������奼R��b
h<�Z�t,s�{��D��x�Rf��Z{�[y�Mv=flǦ#�
�KϘ��K`����Ӽ�[�o�!j�X1� �(~���`�+M�4DP�~^CSf8#��c��(�h�\	Z�*��#�f{�(�g��]����.�hk�����LR��+���G���M��e;�a������T��)tcB�3F�V��a��V��%�j+����fh���C�B��a-���V���jZ�K'UB�z������Fz�(W��I����?���� |q�.      t      x��}��F��o�)�(��?�+�}��$��j_�~"�`J�_]j�]6�[�܇����$�N�'4S�T{ʆ��D�����+���l�E��Tq������ɨ6�{+�w���f=��U����/dY���{]LF�ku�������r��v&��K��v����}��I67:��H����Z�_��v��e���_�a�a�/,~Q����K�1H�܄���!�ӄ�&(�a���[ED���*�<���34R^(B�W���'p�7�b~�w���fov������d��J��|m�z��*��v��o&�[�Q�.����EpF`�0N�ǔ�8��D�M�	CO�<���8��l]l�`n7�߫>���"�п�]�^���죑���Jv�\)����B�3�4�ƴ,�֛N�,���_j�ھ_d�ѝ��l8Z/����ſ�E�/����J���VZD��,�V�3aL=�p�c�����L�Ƌ,bÚ{
%�K�!��9� ~T���p�X,lq�����q�f�`N�x�&�����U�se�w}L�/�2�Q0[:�*
�
��ӂ��E{:F�y�H���8(��7�QP�t��F�X-���L��Z{'��ͺ�~�M������N�k1���_He0A��t�E�7�{2��c��u��ƚk�T��rL��.���"�{�����c�0T���f�E��������oXF��5_�w���N��u��a��Ǩ�w[�i-�GC�(!���.�����Ѩv[u(N�b<�n������m��ٱ���m�6�#^�.���tp��X�.<ƙ�t�b�HS���prg��o����PҙV4�O�����׆%k9����k�l0�{�Ya:9��r=Ao����H���L��H(����1��Y+�,��U,b� q
j�cu}?����g�m��G�~��vu5lZ�Kt�%I�1�p�t�;���_��CT�ph��H�����WG����=áNE�%���π�3��
� ��B5{��.�v�䷌�+����[�n_�\����B�-�M�_��oV�B�V��,#9:eY(���q��P�ΐ0?��?D���,�a]"~�ɰB?ޡ{<<�9�Y��Ƞ$���h�<5+���&r�m�����
�
)�*�jp�r������FLrr�䟂�߃]9���^n��J�e��|�O�i�3���!�~�����b�AH@�M32*�$�fm�|[i�Bcx	ѧp��-;;�����QX�޷�c�<.��B�:+vz�x�E��݉��8��{���Ł=#E)Mi]ʈ`��%�E�x�9:��r�P�ԧp�_�w٧ w���	��^�'��k�B?˕
�t{�s�P��mM����#�1I[��J��l�o�L�k��i$��L}D5\}�̏�sf�Z�,���%��"\𠗟�JԼ�J�[@*�������p���	�I:��e\��T� �D�0T���FE	2�G������4(�ܖ�+6��ep�*�խ{������2����x����C��z����<��d8��lN�/IRPa�&B�0�h�i^~��7��A
����;�Ț�n�Y����l����iHu��U�g[O~�]�dV����L׀��� %�8�8Q���"\�2��4�Y�������HK�թ��s6X4�u
���/�Ki3=�������_�CՕ����5�<ᡧ X�TA��"��������M�/��zWN�_tQM;�Fy�&������V[O꺽��z�{�le�����sF�7���� ����C�_F��"d��@�m�ק�w��,���ڿ�-�����j!1�|�� R�|�'���F/hA�_Xf�P����4��b�)��1�Y
3$~iD ֟��,�+�����O��C������ m�]���~��~q�_�J�v{����!���_3�X���(\��g0|�V��R��h��2��!�}�_�.�
هkZug=��WS�?u=q]�]�nj�#x&�k����� �U)%/6m����I"J=e��B ��F
�)4�p-���:��Z`喹v���E����ͷ�j���po���Q�l��;\�9#�Mݒ��37��c@j@_x!�O	M$�A�	"p�X��"�(sP��̹[�L�r���
��f�o����x��nŘM�����w�r��H�N'�dh�E1��``�+��X2\������}�����5z�P��O���Ǐc\=��Ld��UM�	���7g��e8)��C/p�/&i�H!��4c�h�>x��l(ԤD)��x��͟E��\��4!�21�$3���B{����Jb�O����n���<��m���8'�-�B������_Z4���F�Iw?{�+!=g�4��8"�I<��1@i+�G���=�w뺆���8�͚��J(��ݩ�)4�Cԥ*\���\F�C�����.T^��X���+c8��@*��%Vx�_i�� �?�K�w�\{���\��Òn�p��^ϳ�`�N�"j�Q�p��v��r3� �i��H�A�uO�����]��
[&�H|4sp���R��])�y]����;�����$��cz���_A�f�7���~�����Y��d�f�5$�:�0QOI��@4,"�X�\�~�������������A�?�ݯ�l`��dh��Vؔ�҆m{��;\���a �*�$�)�BM<�T�ͱ����V�P�m�G�*�|�nP;��+�*Y����07hjou��JPw�Z{�S=iu��{�~k��e��h��(�0�FD&�"��X��J'���j��|�S��7����kn��u�K6�ſu���[_��_�+E�h���H�נ�����p��Q���k#����,%��R�e6��~�w�0���E��ׇAg�㐝烫��񮉎h4+�K��Z=�CCX_��u���	�vҫ#Cx(�H � ��3	E�4�6�:pg�o�q�׵漠�l�w�Q�,HI,����#���rYu����ïW�p]�*#8bi��Z	&d= ��1���I�D���~�T�=��n]G��u��Պ�v�>nM��y4�=�T�vw�����z�����@��k�Ӵ�U�	��È%N��u#�BH�0s�3��m� p��x���a�t�VѬ)g�H%��%f�VL�Q�1-��J��k�����3XiLS&�HJ��xQ� p� [c+�H
J�3�p
���j�5(T݌��uOڛ�d��8��m��l��tն5N�����{��gfb���M;4���3B�����,q�Xr-�6!���x�n�,�Y���:��G�e������02�MTg���<��^��?w4�k��hZ����:rHW&��(Ě~���2{"4>d��"�U/���Ծ��Y���5h|������h����Ժ�����+�(Qi3����`n<�<�	�U�zI�13�$1�}�op���nv�x�Rh4Faў;�B~w��q�/}M�e���'�r�y����d�D ��pu&��^d��?�eA�0�1 ���.p*�Q)�t����(�@!��f����($�L��fav}��>j��B&�w9g��$�a|T��먂��W�h�u�N�>i�m�3{��
($�*���.%a(�E�ʉ�Xr���ՠ!��Ѽ��,y�T>c���mQ��Ee[�lu����.w�%��Q@�t-oG�֡��\��y��T���� �(���(|�c�	��{��pWoC����"�����;�9]'� lu�X������W��mF�(Σ#n��� X�~�N���&6T�e�u#ˁe@z����-]i�s:LF��Y�uP�^q���v�Q��]�,�K��
^ŀ��~�8����L�^�f�����o��ύM~{m�e�Z�:����գ�/.a�Q�R!�2���%� GD�)���jף��˿!�
[�=���%    �B
�b���#�Yzi;{z��Y�gR��C�f�z1�%�c/�d��3���ħ|{:n��.��FE4 �<�GKK�0��1�c���� i�c[.-�hrpE�\�����׶֯��W�����v��>�q�q9~6ֈ� ��du��n?��I��+�c�#zII�	lAi�I���VR��:h�kC����z������?vC�]���^�o�Fy_6��j������P���q�[�t���t��$f�*�=O�zdݲ��"HW�Q��p�z>�0���Ǥp^�iP���ݿ����M�w-�BML/$^=Z:jk�gaL�V)���8&DQh ��"ϨHx':�2��9~S�,7��&g���嬮�k�k ɸY�3���â~+���a�t����]��i圭~����0�*]�JC�B����a��P3[����c�}�G�k�`�<j>H}׶9/�ӂ�಼w��-�R�O}�$�ɪ3����~e�"$eʢ�K�$�� G����H$X��3t������7x޵���m}\�͋
t�#�C�:��X�n�~�r=?S�V#x7.տ�#�.���1�zP~����C,<$���"%?3�N4\����n��@^~�*����كM��&�����^�W�&�x}]Ԯ�uTyp�����j�@Ϥ�2@�4�%qB�+Twނ�P^È��ahLb�6C�3�T�a!)�����$�q��v^���(<�M�r=���'���&:���bO�v��j�dS�ď��zD���-s���;���Ea-�_!��Hb䁀�|��+�йa�m��߂qK9�4&�+0��DǑ	����'�._���V̞ә� ��x4���3�$#����k0�}	"Y!����O�X1k`��*�8&�� ��ÇD@��"b~}�H���/ۯ��1�{PA�a^�N��@�YPڄ����?<ϋ�հ�<:�a{��_~%��%g�2�g��K����;��#tke�{OB�8b(4��Μ
s��~���_(��7�Jyr;*;�rן�F�UA���؋�7e�{7��8����C���9�|��I��YP���'D�$1Ƞ�R
̫k��ng���������f;�C�w�g����4
|P��6|L�W&�9&)��¦�,�L
��PAY
�֮%+� �b�����
l:�s���mCkQ��/+�n�C�?��}o�pp�Ԉ��D��m+�o�9�EUX,��<�{$��c6J�g7 �8�c,B l�b�E��P��k��~e6.浻d|�X^<�K�6�����7y����;\�N�<'H �����Bn��$�ED��w��*bڰ�s�s��G���-O/�7��"������m�&��uԴ�Ŭ~Z�}���W'�[�n�������y�I�{��ݩB���#�!��#р�j�q)B.$�1���E�Dҋ8����sh�=.8s�b}Ԓ���o��+<�S��Ϧ�~�ÈfcF1��\*ǝ׷k�+x�U�ڬ�7�n��3X"�v�a`JK�p`&Ġ��W��F*�)W?�(��5�u�3�n�m֠��m��X=�1}ܢ퐬�Sϴ��찹՝����v�Y��u˃:���3��j�`��K2��Ip�84BnÈ�~��?�m�V���ٛ��#~t�(�ꮑ�{��bv��ou�-��n��h��Y{�Ϗo`��U�P,)%��&BE2&nc߂�� �f,ԑa@�no�	,����琨IЃ����8uY�8�&�c��d���|��i�@��������I�2��R��j/�X�vT (��@�)�%?�/�	,i����� l��ˎ��JvQ��˳y��j=ɲ�?~Tdn�[����'�wG�MQ�/�sFF��*�זu�(M��B�+/D�� ���?�����X�>�C�IН﫪��^Ѭ;�xު��V��o>���mT�5��;�`Yw�J���L�1	��l��)H�=É�0ܰ���ȍW\��$�kruIg���Y䯝Z���t�_�����F�%���5�����vF��簗�3���I	ք2VI� �m����
���42U�����77���/g��`�-ұ��P�:�|ٶL�e�(�ʹ$�� �r�7�̭�d��t`-�
�Q��b
��� {��8Elc�y���!����F�̏�- u�(����Q�z�O��:��C��6�w����/�kӊ���ߘ2u�^���Fa )�U���8���Λ�;�a����rk+��g�20��꫼��_��g�ڶ5�іR';j\��h,ƛu�V�U�$��@�(.��`��`�u��Jg��`J#��Ȉ���6�!q!�&D~.���!7��#��A"�P�󇥡�=0�"f���x�[ks'�yh�A-;��8d�1�_�y��c�R�A�EV*@Vz��Ge����J%��$]=���1~���*���Hg:szZ�U�v�66�~����ӊ��b�Y�Aq��M����__�2wD���� �P~*	�G��OE�zQ,�� `��=�~|ѺO�P�9������,�s��V7��\1�n��W��YԘ�`�=�o����L��Z�I9$K�4Y7P0���x ����B&VBm
��CO�ނ^��1�?oT����v�	N���E��1�L���I�R�T[Mz�6��M���]�(	R7]KR�6AحI
(E��v+�<r#����?�����Y���=��@�,��<w�s(����U4e��u@�+�ζh�̏6_,�`忞[����<���Y)�0H�LCa
ݒ3�2",D��?{���2��7X����5u�np�'��SYW�A�9$���f1�����n�+s�tBp��kD�DQ(�8�`�DB-�!zAZJ9O�g�����u��y1���U6��e�X�����"j�y�Pmݻ���2,��v��{3_����!3��g>�q�9���T�A��BP��b!n`��nS��,�:�`�[eh�����e��մQ���|j�1�/�{��d}z�E�u�>���T�ܐpc<�\��1HK�t�0��?���U7{K�MwE�ѵ,T:�}������["���ߖ�hYl׎�ӡ��1�\p+fJ"�ҥg�HI(s�������"n�0O�?��^F�p�"}bw�����+����v�4�.^��ePA�[ݽ��
�\��r�ݝ�g�����ҝB�4���"������#`d��Q��1�6R�o����Ğ�n`dA)iF�')D� �%������-^n}��"�|�0-m�h��w�<�}�?{Ԏ�u��ѡݪo��Y�^͚��,��{��i�rǌRa�أԍ{�u��X�8���O��]��i�M���׊����U?�ެp��ͨ�
7Zή�q���S�V#ѿ�s�ʟ�=W:_A5b���tbV�M{������%�:��]X{o���ngZ7:q��~�>��[��*��d�|���vڟ���)�#�/��U�ʬ�KWg�\������+���+&��C` ���LG�~t��>�����I���f�m��e����^��6\k�$���`���׆�\��<kw�V%���=-gC&�!i���B)�"�,�0)?:	��P|=qp�N���pv���嶽RFޗ�u�O�)��j�0���h�H/p�t�f�2L*�v�J�z̉v�Ա�hQO#DL��y��;&�B�-r�e���,aIw�P=�)-�AEX����C�U<��ڶhW?��ŕ��N�oFJ�T��%1N"gL(����
��z(�6��HL��@��U_+/y�a}�LQ�J�z񼟜�^�Z�����]��G};'M��F��o�������ĠGi+/�0����^�c�0�Kd�`H���B������G��y�Ѿ|�����ϲج���-ͪ�������dsl/t��x������g(���OZE�*F���n�=��q3�?�w����K�)��q�`��+�]QU�K���E|�����Ƽ[���c�Lw�����qHF��i�����&@���|�b/���Q�b����g��5�n�[���_ݞ��= V  ܪ*������J��$��Z~�֟ԋ7��lv/�Rճ���ٺJg]���%�+1�q��ce��J˟w�ǌ�� �Aa�] 7�}jli�>.��N�#Z�	��FO5[��`���U. f�\ kΑL�X7��^��W��$(C�a��r�e~�'/|��B����k&/�y�-�k_��y�(Q�$`�����e��ټ��w�\��� 9S�<��P&`]� ׺�A�z1�j��Ȩ9��<�L����i���k;��^P�_F��[J��^�N{�k��������+��a�����]1�QZjF�Jܥ Πn#��G��aI�D9��&T�<D£��荀I�nՙфF(����w�Q�[�}�y়;�n�%�����09��ͱq�Mj��a�'�l���k�RwR�&ɔmgk�Q��9)�����q��Z*��?���?�埻/�)���������V���+6���)�� OS����bڮ��֕!�A �T�)�D�rG��搨0q˒�'�"��$?jX��*$�,Ъh]���T���E��Qq�����,���\���{��e6*�7���}2L��i
��Ƃs3�����X����J'�����ݷ,5su�e���c�8����5��>���w�-�lI�mcטz@~�e�띸���Gi{8�k�<��S�k��RA��u�ϩ�9r���ߩƌ}vTC����`���Z��
kܺ�
����r�T��J�~��	�!7�I!�AN4>��'�5��5���i|,t�B�����ǊoV^A���ȩil��m�i�������㊑�o�]Mه��RnD��d��w�,��/E��B!�g��!���P'�J����� s�R:��Qh�p����H�n�2x4&A�ۏw��w��XJ+K�$��g����y��pL5��Z|T�W.^�ru���-��{��X_Tn]R%5�#��g�tS$;�e�bᄇ�e���^��+*Tj	k������}�Kk`[4�� �[��	,��\g�RM4������"���tζÇ���~��r߃�%�&)�F�D��"�(��L�&m��J&��������Է�.馾��t3���io
�N���E���î��G'Y�X���(�]_�>GdHf8gPIRVa�h����z_&܁�Hq(I����cM&�{C��wg�Xׇ�,}�0�h���^K��Xw��f�?iy��h����c~+_�\����Z�����1g��!l��В2���<�0�%��%��!�%y^z^Jz��X+�V$JRl��AͮA0���^��u!�Z��ȥ�5]��:�����_�o�gjzz��|=������?RIޔ*������4��5�k�&^Kx s.S�X�I��l��N�.� ��<����va��z����)�mc_@��r�˝�ţe.Q�H����y�L(O){Y��K��-���G����b��aAʻ;��L�f�: w�"���`���D�'�*Ɂ,��C��n�%o/��!.d�~������ wLʾG���.�r�J���8�N5ȘDX�O�r�`��N���}~�D�0���~xD������RE�����)0�]���]h�6Zo����s��s[(�4�JD�Bʲ�We'�� �px�%*�9��T�o����|�Q��C��I�P몃b�Z�Z�� ��@��Y?���� ҈�r-4AS��n3Ei��ہ�P׺Kt�>�]c����s՘���U�|��=�+n�+nV�L����J����ov����mK��	<�ކ�=�+���@�A��U�)B�Xdc������1z#�������f7�&�y�s��[n
�&��s���Ϋ|
��tC*y5��$N�#J�)I��ELx1�:���}t��}d�{���:��t#?���@LM��K��I��uW���;%��Z��?G�8�:-��}%� �ݦH���A���l��H�����7�� ����]��Ç4��,�=�KI�܊�U����!נ�M�G�wWf��X�]F��_�h!9D.r�,v�S�[�2 �23�7�����H��o*�9����8��G���
���������}s��Z>����t:����fm4Ϫ��W��x4T�b�^��_���	� �R�
���g��	|�ݭGVx@S"�"��h�=��������>�Yi|^�����=����F4e����m����|�ƃ`�^�>�	�(Vv��Rc!�a�g����F�KtlB�Xd>�;������}<���r��bava8��r;ϱ��
6�ZT�.�u¯�pM��\�����{@$�!|ĝN`@�v;��R���غ��:�A�w�F��X6䴡W�L�"��t.�����rJ6�r�r��3wQ�?�)��&����p�I��F�!"h�U��Gg:�}�-�^�����\V�Ɯ�<q���lO�*�"��ץRd���u��f�p�/�[�iﴲ��Ps����1�?w'���6')v�~�;~=����x\؊��¦u�����h���������,��4�6��`��3����]J��D���[�p�*t�VI��� H���?���wNe8��T�m�C
��/�ì�=�}^�/�����:�%�:�}%�?p	r����N)�eQ"C����;b�0T���^)�GC�'\�N2ܙ#������c��r���(�����,kޏ��m�r��ݙ��G����Է��`����/�d�(�k�3���$�7$�	.s疿qf�n���l�l 9ۤ%�h�f+O_�a�4t_�;�×�#�W��l��3��*-�ʺ[���
�@�)�R�Ŗ1$B��($s�x}7�=3s{��^�������srkג�w.^dz�E�Z�xq݅��W=����:rc-"�|��:+�nHMD莶�r��s����oX�;VU��Rם��4=��ٵL'{)���S��΍�d_ye��}w�;�M�)iƓ3��cg]jOS`�:��5)0M���g�=����}�1��	�uY��l���fk/����l6`�mn�X���`[���}Ny!UaNQ�ohb!C�-���H'�!i`�I(b�ٜ��np����%�.ȿ�%�կao���11BO��.H���j�'1֫M�>��5~����>��*#A���\1��q�K<$c�ǈ)/D1=ĸ�c�,���d_�M��y/��\o�b�l���y�FwӠ�)�e����AǷ �����ն��yA�
���)�JI�Y�Hy(vg�c�E�{
0�H�������ig��k����뷞�mg����֓;���hW��M#�z��)�EmQ��yS&��r�����W��l$��M�t��q�܉�v7؋� �%�M�Aп�_����/'m:V      o     x�mT�v�����v$Y��Y��~c�u'zb�'6&	_DwrW���-T�]��s(�3����1BȦ�E����@L�����Z @<�[�%[��Y�����J3O�n}w�TT��}��9K�y8^���2~�p���eRa�����`4������4�6gʵ��TP�7��6-��"�[���Y^e�e��5��R��`����R�d�l;�C���QR2�_�0}g�m�iʪdPJ߷������L�����<�`��g�[VX�h��Y����S�IS�).ە<��>�m��O�����U�ؽ��^�PY��M��c�}��ؚphc ��d@lJ����#V�nI1W�A����=<�r�d�y?��iQ*�?=��p���Bn�u��r����k��G��uuԭᡕF��f80C����-��1�5�[�6)��.�?|Q�B���}�%�O.�Ǯ䇗���t���R�n�v;�֪���At����&6�[->�0��$������7������$sȈ%Y���-&�_m��U�k7�d�qV�<��<�ms�>o�Q�xn�������h`�)PF3� Bh�{�+�
V�j�f���[�sS�u�n��I䬻�ӈt.�s '�9+�־'��me��niuٌ������a �P�6��z�?6�H&��*kʢ��0+��O
��(f���FY��vf����i�z���f��t�y�����|��K`�C	c	�X�1�RMH��/�'�?�e��AI2Xe쿊Q=ٝ����D磷�����m�O�Yz������.(0`	d,�1��>�	�\�zL0��I٨G,+�'�I���s\^��ě^eu,wsV��~х
�x�xx����>���A&�$�������%��%.����4���x�@n�?ITu�8�u��g�|簫]O��U^;z[��t��ߝ8X.����S6��0�:�T�|�x� �G�6a��g��=H��P�u _����|%�N�P��)Nó���	z�-Ԝt+6K|��i���k����Sq��?�#�Ϭ#(1��I�@� �B�����>����L{p��P�|=�$ut��~\7cX�/*�k�.��u�L�C� ��om�M � 3W۔cF}.���['�o	����a��y�"�os��Oa�R�v���P?uQ�e���t�|� �����M��$�2��Xc���r���I� ���\�����<���fQ�mA�p��Gj�!
���0�W�c��2��c��q~���x�X�     